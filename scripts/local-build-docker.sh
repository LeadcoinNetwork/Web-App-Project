cd frontend
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t leadcoin/leadcoin . 
cd ..