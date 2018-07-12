echo "start docker push"
echo "Loggin..."
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
echo "Pushing..."
docker push leadcoin/leadcoin
