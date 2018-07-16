echo "start deploy"
scripts/local-push-docker.sh &&
ssh -l build b.leadcoin.network -i deploy_rsa -o stricthostkeychecking=no "bash -s" < scripts/remote-docker-pull-restart.sh && 
ssh -l build b.leadcoin.network -i deploy_rsa -o stricthostkeychecking=no "bash -s" < scripts/remote-remove-old-frontend.sh &&
scripts/local-copy-new-frontend.sh &&
ssh -l build b.leadcoin.network -i deploy_rsa -o stricthostkeychecking=no "bash -s" < scripts/remote-try-delete-old-dockers.sh
echo "finish"