set -e
echo "start local-build-docker"
sudo docker build -t leadcoin/leadcoin . 
echo "finish local-build-docker"