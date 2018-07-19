echo "start local-frontend-build" &&
cd frontend &&
echo 'Start NPM I in frontend' &&
npm ci &&
echo 'Start NPM run build in frontend' &&
npm run build &&
echo 'Start NPM run storyboook:build in frontend' &&
npm run storybook:build &&
echo 'finish local-frontend-build' &&
cd ..