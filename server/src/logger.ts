import Pino from "pino";

export const createLogger = (): Pino.Logger => {
  const loggingInstance = Pino(
    {
      transport: { target: "pino-pretty" },
      // level: process.env.LOG_LEVEL,
      useLevelLabels: true,
    },
    process.stdout
  );

  return loggingInstance;
};

const logger = createLogger();

// Return a singleton instance of our pino logger
export default logger;
