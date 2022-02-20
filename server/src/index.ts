import 'dotenv/config';

import { Application } from 'express';
import path from 'path';
import pino from 'pino-http';
import { createExpressServer, useContainer as useContainerRouter } from 'routing-controllers';
import { useContainer as useContainerTypeorm } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { createTypeormConn } from './connection';
import logger from './logger';

// Hook in our routing and database DI
useContainerRouter(Container);
useContainerTypeorm(Container);

const app: Application = createExpressServer({
  controllers: [path.join(__dirname, '/controller/*.ts')],
});

app.use(pino);

const port = 3000;

// FIXME This is a promise, either fix top level await or wrap in async function
createTypeormConn();

app.listen(port, () => {
  logger.info(`[${process.env.NODE_ENV?.toUpperCase()}] Server started on port ${port}`);
});
