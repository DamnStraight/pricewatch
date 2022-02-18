import { createConnection, Connection } from "typeorm";
import logger from "./logger";

export const createTypeormConn = async (): Promise<Connection | null> => {
  try {
    return await createConnection();
  } catch (err) {
    logger.error(err);
  }
  return null;
};
