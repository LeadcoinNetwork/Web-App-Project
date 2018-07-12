sudo docker ps
sudo docker pull leadcoin/leadcoin
sudo docker stop backend && sudo docker rm backend
sudo docker run -v /home/build/.env:/usr/leadcoin/backend/.env --network host --name backend --rm leadcoin/leadcoin