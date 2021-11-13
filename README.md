# webdeck

## Project setup
```
npm install
```

## Project developmet
```
# (1) Project root: Electron desktop app + express + socketIO
npm run electron:serve
##
## (2) also go to ./src/app-mobile
npm run serve

or

npm run start
```

This results in:
- Build #1
  - Electron app (tipically with port 8080)
  - Express: http endpoints + static site in production
  - SocketIO: websockets
- Build #2
  - Vue app, for mobile `webdeck`, port 4000.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
