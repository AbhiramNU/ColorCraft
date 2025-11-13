import requests
import os

print("Downloading colorization_release_v2.caffemodel...")

url = "https://www.dropbox.com/s/dx0qvhhp5hbcx7z/colorization_release_v2.caffemodel?dl=1"
filename = "colorization_release_v2.caffemodel"

try:
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(filename, 'wb') as f:
        downloaded = 0
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                percent = (downloaded / total_size) * 100
                print(f"\rProgress: {percent:.1f}% ({downloaded / (1024*1024):.1f} MB)", end='')
    
    print(f"\n✓ Downloaded successfully!")
    print(f"File size: {os.path.getsize(filename) / (1024*1024):.1f} MB")
    
except Exception as e:
    print(f"\n✗ Download failed: {e}")
