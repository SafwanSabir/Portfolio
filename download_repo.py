import urllib.request
import zipfile
import os
import shutil

url = "https://github.com/Yuteoctober/wins95Portfolio/archive/refs/heads/master.zip"
zip_path = "repo.zip"

print("Downloading...")
try:
    urllib.request.urlretrieve(url, zip_path)
except Exception as e:
    print("Master failed, trying main...")
    url = "https://github.com/Yuteoctober/wins95Portfolio/archive/refs/heads/main.zip"
    urllib.request.urlretrieve(url, zip_path)

print("Downloaded. Extracting...")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(".")

print("Extracted. Moving files...")
source_dir = "wins95Portfolio-master"
if not os.path.exists(source_dir):
    source_dir = "wins95Portfolio-main"

for item in os.listdir(source_dir):
    s = os.path.join(source_dir, item)
    d = os.path.join(".", item)
    if os.path.exists(d):
        if os.path.isdir(d):
            shutil.rmtree(d)
        else:
            os.remove(d)
    shutil.move(s, d)

shutil.rmtree(source_dir)
os.remove(zip_path)
print("Done!")
