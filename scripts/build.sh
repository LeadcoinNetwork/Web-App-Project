set -e
echo "start building"
echo "calling to local-frontend-build"
scripts/local-frontend-build.sh
echo "calling to local-build-docker"
scripts/local-build-docker.sh