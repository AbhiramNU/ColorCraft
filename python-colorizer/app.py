from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

print("Loading colorization model...")

# Load the model files
prototxt = "colorization_deploy_v2.prototxt"
model = "colorization_release_v2.caffemodel"
points = "pts_in_hull.npy"

# Load the neural network
net = cv2.dnn.readNetFromCaffe(prototxt, model)
pts = np.load(points)

# Add the cluster centers as 1x1 convolutions to the model
class8 = net.getLayerId("class8_ab")
conv8 = net.getLayerId("conv8_313_rh")
pts = pts.transpose().reshape(2, 313, 1, 1)
net.getLayer(class8).blobs = [pts.astype("float32")]
net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype="float32")]

print("✓ Model loaded successfully!\n")

@app.route('/colorize', methods=['POST'])
def colorize():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        # Read and convert image
        image = Image.open(file.stream).convert('RGB')
        frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Normalize to [0, 1] range
        scaled = frame.astype("float32") / 255.0
        
        # Convert to LAB color space
        lab = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)
        
        # Resize to network input size
        resized = cv2.resize(lab, (224, 224))
        L = cv2.split(resized)[0]
        L -= 50  # Mean centering
        
        # Predict a and b color channels
        net.setInput(cv2.dnn.blobFromImage(L))
        ab = net.forward()[0, :, :, :].transpose((1, 2, 0))
        
        # Resize predicted channels back to original image size
        ab = cv2.resize(ab, (frame.shape[1], frame.shape[0]))
        
        # Grab the L channel from the original image
        L = cv2.split(lab)[0]
        
        # Concatenate L with predicted ab channels
        colorized = np.concatenate((L[:, :, np.newaxis], ab), axis=2)
        
        # Convert from LAB to BGR
        colorized = cv2.cvtColor(colorized, cv2.COLOR_LAB2BGR)
        colorized = np.clip(colorized, 0, 1)
        
        # Scale back to [0, 255]
        colorized = (255 * colorized).astype("uint8")
        
        # Convert to RGB for PIL
        result = Image.fromarray(cv2.cvtColor(colorized, cv2.COLOR_BGR2RGB))
        
        # Return as JPEG
        img_io = io.BytesIO()
        result.save(img_io, 'JPEG', quality=95)
        img_io.seek(0)
        
        return send_file(img_io, mimetype='image/jpeg')
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model': 'OpenCV Deep Colorization (Zhang et al.)'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
