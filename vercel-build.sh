#!/bin/sh

# Download and install Git LFS
echo "Downloading Git LFS"
curl -s https://github.com/git-lfs/git-lfs/releases/download/v3.2.0/git-lfs-linux-amd64-v3.2.0.tar.gz -L -o git-lfs.tar.gz

echo "Extracting Git LFS"
tar -xzf git-lfs.tar.gz
cd git-lfs-3.2.0
./install.sh

# Initialize Git LFS
echo "Initializing Git LFS"
git lfs install

# Set up authentication for Git LFS
if [ -n "$GITHUB_TOKEN" ]; then
  echo "Setting up Git LFS authentication"
  git config --global credential.helper store
  echo "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com" > ~/.git-credentials
fi

# Pull LFS files
echo "Pulling LFS files"
git lfs pull

echo "Git LFS setup complete"