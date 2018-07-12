set -e
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
sudo docker build -t leadcoin/leadcoin . 