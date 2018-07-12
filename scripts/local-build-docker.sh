set -e
echo "start local-build-docker"
echo ${#DOCKER_USERNAME}
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
sudo docker build -t leadcoin/leadcoin . 
echo "finish local-build-docker"