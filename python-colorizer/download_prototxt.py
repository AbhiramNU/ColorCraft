import urllib.request

url = "https://raw.githubusercontent.com/richzhang/colorization/caffe/models/colorization_deploy_v2.prototxt"
filename = "colorization_deploy_v2.prototxt"

print(f"Downloading {filename}...")
urllib.request.urlretrieve(url, filename)
print("✓ Download complete!")

# Verify
import os
size = os.path.getsize(filename)
print(f"File size: {size} bytes")
