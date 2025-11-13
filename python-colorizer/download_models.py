import urllib.request
import os

print("Downloading OpenCV colorization model files...\n")

files = {
    'colorization_deploy_v2.prototxt': 'https://github.com/richzhang/colorization/raw/caffe/models/colorization_deploy_v2.prototxt',
    'colorization_release_v2.caffemodel': 'https://www.dropbox.com/s/dx0qvhhp5hbcx7z/colorization_release_v2.caffemodel?dl=1',
    'pts_in_hull.npy': 'https://github.com/richzhang/colorization/raw/caffe/resources/pts_in_hull.npy'
}

for filename, url in files.items():
    if os.path.exists(filename):
        print(f"✓ {filename} already exists, skipping...")
    else:
        print(f"Downloading {filename}...")
        try:
            urllib.request.urlretrieve(url, filename)
            file_size = os.path.getsize(filename) / (1024 * 1024)  # MB
            print(f"✓ {filename} downloaded successfully ({file_size:.2f} MB)\n")
        except Exception as e:
            print(f"✗ Failed to download {filename}: {e}\n")

print("Download process complete!")
