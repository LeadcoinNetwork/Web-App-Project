[ "$1" == "force" ] && force=y
echo $force
while true	
do
	result=$(git pull)
	echo git pull
	echo $result
	echo "It will autodeploy every time the result is not Already up-to-date"
	echo "To force autodeploy launch ./autodeploy.sh force"
	if [ "$force" = "y" ]; then
		donow=y
	fi
	if [ ! "$result" = "Already up-to-date." ]; then
		donow=y
	fi
	if [ "$donow" = "y" ]; then
		echo "we should do"
		git log -1 > frontend/dist/gitlog.txt
		git log -1 > gitlog.txt
		git log -1 > backend/gitlog.txt
		(
			cd frontend;
			echo 'start frontend npm build'
			npm ci  --unsafe-perm
				(npm run build) &
				(npm run storybook:build)
		) &
		(
			cd backend;
			echo "start backend build"
			npm ci --unsafe-perm
		) 
	fi
	unset force
	unset donow
	echo "Waiting 10 seconds..."
	sleep 10
done
