(sudo docker ps) || true # maybe containers not exist
sudo docker pull leadcoin/leadcoin
(sudo docker stop backend && sudo docker rm backend) || true #should not fail if "No such container: backend"
sudo docker run -d -v /home/build/.env:/usr/leadcoin/backend/.env --restart="always" --network host --name backend  leadcoin/leadcoin