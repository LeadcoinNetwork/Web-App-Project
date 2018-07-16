echo 'Testing backend docker'
docker run -ti leadcoin/leadcoin npm run build
exit $?