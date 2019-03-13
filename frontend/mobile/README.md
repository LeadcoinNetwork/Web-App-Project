### Build apk file for mobile version

To build mobile application you need to make a few steps:

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

* add android platform (only once):

```
 npm run platform
```

* we need to modify index.html and move dist folder to "www" for mobile version so run:

```
npm run build:mobile
```

* finally to build apk file run:

```
npm run build:apk
```
