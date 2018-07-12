cd frontend
echo 'Start NPM I in frontend'
sudo npm i > /dev/null
echo 'Start NPM run build in frontend'
sudo npm run build > /dev/null
echo 'Start NPM run storyboook:build in frontend'
sudo npm run storybook:build > /dev/null
echo 'finishs'