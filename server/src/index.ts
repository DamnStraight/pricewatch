import path from "path";
import { createExpressServer, useContainer as useContainerRouter } from "routing-controllers";
import { useContainer as useContainerTypeorm } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { createTypeormConn } from "./connection";
import logger from "./logger";

useContainerRouter(Container);
useContainerTypeorm(Container);

const app = createExpressServer({
  controllers: [path.join(__dirname, "/controller/*.ts")],
});

const port = 3000;

createTypeormConn();

app.listen(port, () => {
  logger.info("Server started");
});
