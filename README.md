# Express React Chat
Simple chat app made w/ Express/React/SocketIO. Fun exercise for exploring websockets

## Table of Contents
* [Quickstart](#quickstart)
* [Tests](#tests)
* [Deploying](#deploying)

## Quickstart
```
git clone https://github.com/nezaj/express-react-chat
cd express-react-chat
npm install
make server // Start express server
make dev-client // Start create-react-app (webpack) server
open http://localhost:3000
```

### Tests
```
# Run eslint
make lint

# Run tests
make test

# Run lint and tests in one go
make check
```

### Deploying
Currently deploying to heroku
```
make deploy
```

[express-react-chat]: https://express-react-chat.herokuapp.com/
