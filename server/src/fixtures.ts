import * as path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { Connection, getRepository } from 'typeorm';
import { createTypeormConn } from './connection';
import logger from './logger';
import { User } from './entity/user.entity';

// Check if a table is already populated, if it is, the fixtures have already been run previously
const shouldPopulateFixtures = async (connection: Connection) => {
  const maybeResult = await connection.manager
    .getRepository(User)
    .createQueryBuilder('user')
    .getOne();

  return !!maybeResult;
};

// https://github.com/RobinCK/typeorm-fixtures#programmatically-loading-fixtures
const loadFixtures = async (directoryPath: string) => {
  let connection: Connection | undefined;

  try {
    const connection = await createTypeormConn();

    if (connection === null) {
      return;
    }

    await connection.synchronize(false);

    // If the database is already populated , the fixtures are already there
    if (await shouldPopulateFixtures(connection)) {
      return;
    }

    await connection.synchronize(true);

    const loader = new Loader();
    loader.load(path.resolve(directoryPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture);
      await getRepository(entity.constructor.name).save(entity);
    }
  } catch (error) {
    logger.error(error);
    throw Error;
  } finally {
    connection && (await connection.close());
  }
};

export default loadFixtures;
