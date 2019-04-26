#!/usr/bin/env node
'use strict';

import { ApiServer } from '../api-server';

const port: number = Number(process.env.PORT) || 8069;
const apiServer = new ApiServer();

apiServer.start(port)
    .then(() => {
       const debugMsg = 'Express server listening on port ' + apiServer.PORT;
       console.warn(debugMsg);
    })
    .catch((err) => {
        console.error(`Error starting server: ${err.message}`);
        process.exit(-1);
    });
