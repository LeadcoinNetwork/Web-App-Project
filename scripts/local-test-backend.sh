echo 'Testing backend docker'
docker run -ti leadcoin/leadcoin npm run build &&
echo "Create network" &&
docker network create travisnet &&
echo "Create MySQL Docker" &&
docker run -d --network travisnet --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql:5 &&
echo "Waiting for ping" &&
while ! docker exec -ti mysql mysqladmin ping; do
    sleep 1
		echo "..."
done &&
echo "Bulding Schema" &&
docker exec -i mysql mysql < backend/schema.sql &&

export MYSQL_HOST=mysql &&
export MYSQL_USER=root &&
export MYSQL_PASSWORD= &&

echo "Running Tests" &&
docker run --network travisnet -ti -e MYSQL_HOST=mysql \
	-e MYSQL_USER=root \
	-e MYSQL_PASSWORD= \
 leadcoin/leadcoin \
 npm run test
exit $?