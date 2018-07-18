echo "start local-build-docker"
git log -1 > gitlog.txt
docker build -t leadcoin/leadcoin . 
echo "finish local-build-docker"