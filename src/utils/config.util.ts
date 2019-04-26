// const host = process.env.ROBBYSON_API_HOST || '172.18.0.1:90';

module.exports = {
    // SAMPLE SERVICE EXTERNAL
    // externalServices: {
    //     goalService: {
    //         url: 'http://' + (host) + '/goal'
    //     },
    //     localeService: {
    //         url: 'http://' + (host) + '/locale'
    //     }
    // },
    robbysonConfig: {
        host: process.env.MONGODB_ROBBYSON_SERVER,
        // tslint:disable-next-line: radix
        port: parseInt(process.env.MONGODB_ROBBYSON_PORT),
        user: process.env.MONGODB_ROBBYSON_USER,
        pass: process.env.MONGODB_ROBBYSON_PASS,
        database: process.env.MONGODB_ROBBYSON_DATABASE,
    }
};
