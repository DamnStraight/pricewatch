import { expect } from 'chai';
import { Application } from 'express';
import { describe } from 'mocha';
import path from 'path';
import { createExpressServer, useContainer as useContainerRouter } from 'routing-controllers';
import request from 'supertest';
import { Connection, useContainer as useContainerTypeorm } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

import { createTypeormConn } from '../../src/connection';
import AuthenticationController from '../../src/controller/authentication.controller';
import UserService from '../../src/service/user.service';

/**
 * FIXME Testing structure and working with tests, these need to be updated
 */
describe('Authentication Controller', () => {
  let app: Application | null;
  let connection: Connection | null;
  let authController: AuthenticationController;

  before(async () => {
    useContainerRouter(Container);
    useContainerTypeorm(Container);

    app = createExpressServer({
      controllers: [path.join(__dirname, '../../src/controller/*.ts')],
    });

    connection = await createTypeormConn();
  });

  beforeEach(() => {
    authController = new AuthenticationController(new UserService());
  });

  it('Should return "Test"', async () => {
    // Test the endpoint
    const response = await request(app).get('/authentication/register');
    // Test the controller method directly
    authController.register();

    expect(response.status).to.be.equal(200);
    expect(response.body.data).to.be.equal('test');
  });
});
