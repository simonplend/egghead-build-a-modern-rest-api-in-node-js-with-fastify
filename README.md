# egghead-build-a-modern-rest-api-in-node-js-with-fastify

## Setup

```bash
npm install

cp .env.example .env

npx knex migrate:latest
```

See [src/config.js](src/config.js) for allowed configuration values.

## Run in development

```bash
npm run start:dev
```

## Test HTTP requests

There are a collection of test HTTP requests in [test.http](test.http).

Note: To run the HTTP requests you must have the Visual Studio Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension installed.
