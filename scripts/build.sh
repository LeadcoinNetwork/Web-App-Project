echo "start building"
echo 'create gitlog.txt file'
git log -1 > gitlog.txt
echo "calling to local-frontend-build"
scripts/local-frontend-build.sh
echo "calling to local-build-docker"
scripts/local-build-docker.sh