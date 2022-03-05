import 'reflect-metadata';
import * as dotenv from 'dotenv-flow';
dotenv.config(); // Ensure this is called before the logger import

import { Application } from 'express';
import path from 'path';
import pino from 'pino-http';
import { createExpressServer, useContainer as useContainerRouter } from 'routing-controllers';
import { useContainer as useContainerTypeorm } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

import { createTypeormConn } from './connection';
import loadFixtures from './fixtures';
import logger from './logger';
import { authorizationChecker, currentUserChecker } from './middleware/authentication';

const port = 3000;

const server = async () => {
  if (process.env.NODE_ENV === 'dev') {
    await loadFixtures('./src/fixtures/');
  }

  // Setup our routing and database DI
  useContainerRouter(Container);
  useContainerTypeorm(Container);

  const app: Application = createExpressServer({
    currentUserChecker,
    authorizationChecker,
    cors        : true,
    controllers : [path.join(__dirname, '/controller/*.ts')],
  });

  app.use(pino);

  const connection = await createTypeormConn();

  connection &&
    app.listen(port, () => {
      logger.info(`[${process.env.NODE_ENV?.toUpperCase()}] Server started on port ${port}`);
    });
};

server();
