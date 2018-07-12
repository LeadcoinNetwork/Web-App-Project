set -e
echo "start local-build-docker"
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "docker after login"
docker build -t leadcoin/leadcoin . 
echo "finish local-build-docker"