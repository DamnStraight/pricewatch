import { createConnection, Connection } from "typeorm";
import logger from "./logger";
import { ormconfig } from "./ormconfig";

export const createTypeormConn = async (): Promise<Connection | null> => {
  try {
    return await createConnection(ormconfig());
  } catch (err) {
    logger.error(err);
  }
  
  return null;
};
