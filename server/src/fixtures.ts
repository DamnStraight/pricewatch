import * as path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { Connection, createConnection, getRepository } from 'typeorm';
import logger from './logger';

// TODO Needs to be tested
// https://github.com/RobinCK/typeorm-fixtures#programmatically-loading-fixtures
const loadFixtures = async (directoryPath: string) => {
  let connection: Connection | undefined;

  try {
    connection = await createConnection();
    await connection.synchronize();

    const loader = new Loader();
    loader.load(path.resolve(directoryPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder  = new Builder(connection, new Parser());

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
