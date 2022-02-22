import Pino from 'pino';

export const createLogger = (): Pino.Logger => {
  const loggingInstance = Pino(
    {
      level          : process.env.LOG_LEVEL,
      useLevelLabels : true,
      transport      : {
        target  : 'pino-pretty',
        options : {
          translateTime: true,
        },
      },
    },
    process.stdout
  );

  return loggingInstance;
};

const logger = createLogger();

// Return a singleton instance of our pino logger
export default logger;
