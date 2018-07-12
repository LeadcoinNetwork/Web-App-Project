echo "start docker push"
echo "Loggin..."
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "Pushing..."
sudo docker push leadcoin/leadcoin
echo "Finish push"

set -e
echo "second time with -e"
echo "start docker push"
echo "Loggin..."
sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "Pushing..."
sudo docker push leadcoin/leadcoin
echo "Finish push"