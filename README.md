# egghead-build-a-modern-rest-api-in-node-js-with-fastify

## Setup

```bash
npm install

npx knex migrate:latest
```

### Create a `.env` file

```
PORT=3000
LOG_LEVEL=info
LOG_PRETTY_PRINT=true
DATABASE_ENVIRONMENT=development
DATABASE_URL=./recipes.db
```

See [src/config.js](src/config.js) for allowed configuration values.

## Run in development

```bash
npm run start:dev
```

## Test HTTP requests

There are a collection of test HTTP requests in [test.http](test.http).

Note: To run the HTTP requests you must have the Visual Studio Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed.
