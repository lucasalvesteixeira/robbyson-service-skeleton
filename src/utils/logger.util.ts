const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.label({ label: 'label' }),
    format.timestamp(),
    format.printf((info: any) => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: (1024 * 1024 * 10), // 10MB
      maxFiles: 5,
      filename: `${__dirname}/../../logs/log-api.log`
    }),
    // new transports.Console({
    //   level: 'debug',
    //   // format: format.combine(
    //   //   format.simple(),
    //   //   // format.colorize()
    //   // )
    // })
  ]
});

export default logger;
