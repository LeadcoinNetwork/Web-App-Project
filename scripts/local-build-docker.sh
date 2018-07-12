set -e
echo "This is A:"
echo $a
echo $(a)
echo "$a"
echo '$a'
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
sudo docker build -t leadcoin/leadcoin . 