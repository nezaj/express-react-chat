# Dunbario
Personal CRM for your community! See it [live][dunbario]

## Table of Contents
* [Quickstart](#quickstart)
* [Tests](#tests)
* [Deploying](#deploying)

## Quickstart
```
git clone https://github.com/nezaj/dunbario
cd dunbario
npm install
make dev-server // Start express server
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

[dunbario]: https://dunbario.herokuapp.com/
