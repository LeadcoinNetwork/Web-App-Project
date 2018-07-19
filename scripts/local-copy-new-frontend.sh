echo Copy frontend dist folder
ls -la frontend/dist
scp -i deploy_rsa -o stricthostkeychecking=no -r  frontend/dist build@b.leadcoin.network:~/
echo Copy storybook folder
ls -la frontend/storybook-build
scp -i deploy_rsa -o stricthostkeychecking=no -r  frontend/storybook-build build@b.leadcoin.network:~/