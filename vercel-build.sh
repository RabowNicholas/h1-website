#!/bin/sh

# Install Git LFS
echo "Installing Git LFS"
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs

# Initialize and pull LFS files
echo "Initializing Git LFS"
git lfs install
git lfs pull

echo "Git LFS setup complete"