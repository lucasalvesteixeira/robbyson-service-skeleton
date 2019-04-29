import * as express from 'express';
import { Server } from 'typescript-rest';
import * as http from 'http';
import * as path from 'path';
import * as cors from 'cors';
import controllers from './controllers';
import { Exception } from 'handlebars';

const cluster = require('cluster');
const os = require('os');
const bodyParser = require('body-parser');
const dataBase = require('robbyson-library').mongodb.database;
const contratante = require('robbyson-library').contractor;
const robbysonUserDecoderMiddleware = require('robbyson-library').middleware.robbysonUserDecoder;
// const config = require('./utils/config.utils');

export class ApiServer {

    private readonly app: express.Application;
    private server: http.Server = null;
    public PORT: number = 0;

    constructor() {
        this.app = express();
        this.config();

        // Connect to robbyson Database with contratante
        contratante.getContratantes(() => {
            dataBase.connect(contratante, 'robbysonBoilerplate');
        });

        // Connect to robbyson Database without contratante
        // dataBase.staticConnect(config.robbysonConfig, 'robbyson');

        Server.useIoC();
        Server.buildServices(this.app, ...controllers);

        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'controllers/*', __dirname);
        Server.swagger(this.app, './swagger.json', '/api-docs', 'localhost:{{port}}', ['http']);
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        this.app.use( bodyParser.urlencoded( { limit: '10mb', extended: false } ) );
        this.app.use( bodyParser.json( { limit: '10mb' } ) );
        this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        this.app.use(cors());
        this.app.use(robbysonUserDecoderMiddleware);
    }

    /**
     * getHttpServer
     * @returns {HttpServe}
     */
    public getHttpServer() {
        return this.server;
    }

    /**
     * getExpress
     * @returns {Express}
     */
    public getExpress() {
        return this.app;
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public start(port: number, debug?: boolean): Promise<any> {
        this.PORT = port;
        if(!this.PORT) {
            return Promise.reject(Exception('Server port is not defined'));
        }
        if(!debug) {
            if(cluster.isMaster) {
                this._startMaster();
            } else {
                this._startChild();
            }
            return Promise.resolve();
        } else {
            return new Promise<any>((resolve, reject) => {
                this.server = this.app.listen(this.PORT, (err: any) => {
                    if (err) {
                        return reject(err);
                    }

                    // TODO: replace with Morgan call
                    // tslint:disable-next-line:no-console
                    // console.log(`Listening to http://${this.server.address().address}:${this.server.address().port}`);
                    return resolve();
                });
            });
        }
    }

    private _startMaster(): void  {
        const cpuCount = os.cpus().length;
        console.warn('Server master creating child nodes');
        for (let i = 0; i < cpuCount; i++) {
            cluster.fork();
        }
        cluster.on('online', function (worker: any) {
            console.warn('Child initialized by PID: ' + worker.process.pid);
        });
        cluster.on('exit', function (worker: any, code: number, signal: any) {
            console.warn('PID ' + worker.process.pid + ' code: ' + code + ' signal: ' + signal);
            cluster.fork();
        });
    }

    private _startChild(): void  {
        this.app.set('port', this.PORT);
        const server = http.createServer(this.app);
        server.listen(this.PORT);
        server.on('error', (err) => { console.warn(err); });
        server.on('listening', () => {
            console.warn('Cluster initialized');
        });
    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

}
