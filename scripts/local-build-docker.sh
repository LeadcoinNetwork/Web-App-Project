set -e
echo "start local-build-docker"
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "docker after login"
sudo docker build -t leadcoin/leadcoin . 
echo "finish local-build-docker"