### Build apk file for mobile version

To build mobile application you need to install Android Studio, JDK 1.8, Cordova on your computer

If you have all of it installed make a few steps:

* go to frontend directory

* run build

```
npm run build
```

* move build folder to mobile directory

```
npm run build:move
```

* go to mobile directory

* install dependencies

```
npm install
```

* add android platform (only once):

```
 npm run platform
```

* we need to modify index.html and move dist folder to "www" for mobile version:

```
npm run build:mobile
```

* to build apk file run:

```
npm run build:apk
```

* apk file will be located in :

```
./frontend/mobile/platforms/android/app/build/outputs/apk/debug/
```
