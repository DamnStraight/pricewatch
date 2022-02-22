import * as dotenv from 'dotenv-flow';
dotenv.config(); // Ensure this is called before the logger import

import { Application } from 'express';
import path from 'path';
import pino from 'pino-http';
import { createExpressServer, useContainer as useContainerRouter } from 'routing-controllers';
import { useContainer as useContainerTypeorm } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { createTypeormConn } from './connection';
import logger from './logger';

const port = 3000;

const server = async () => {
  // Hook in our routing and database DI
  useContainerRouter(Container);
  useContainerTypeorm(Container);

  const app: Application = createExpressServer({
    controllers: [path.join(__dirname, '/controller/*.ts')],
  });

  app.use(pino);

  const connection = await createTypeormConn();

  connection &&
    app.listen(port, () => {
      logger.info(`[${process.env.NODE_ENV?.toUpperCase()}] Server started on port ${port}`);
    });
};

server();
