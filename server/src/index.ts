import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import path from "path";
import logger from "./logger";
import { createTypeormConn } from "./connection";

useContainer(Container);

const app = createExpressServer({
  controllers: [path.join(__dirname, "/controller/*.ts")],
});

const port = 3000;

createTypeormConn();

app.listen(port, () => {
  logger.info("Server started");
});
