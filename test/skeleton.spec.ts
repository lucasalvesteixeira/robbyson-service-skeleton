'use strict';

import {describe, before, after, it} from 'mocha';
import * as chai from 'chai';
import * as request from 'request';
import { ApiServer } from '../src/api-server';
import {Server, HttpMethod} from 'typescript-rest';

const expect = chai.expect;

const apiServer: ApiServer = new ApiServer();
const port: any = null; // Set port number
const boilerRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
                 = request.defaults({baseUrl: `http://localhost:${port}`}); // TODO: colocar path principal aqui

describe('Skeleton Controller Tests', () => {

    before(() => {
        return apiServer.start(port, true);
    });

    after(() => {
        return apiServer.stop();
    });

    describe('The Rest Server', () => {
        it('should provide a catalog containing the exposed paths', () => {
            expect(Server.getPaths()).to.include.members([
                '/health',
            ]);
            expect(Server.getHttpMethods('/health')).to.have.members([HttpMethod.GET]);
        });
    });

    describe('/health', () => {
        it('should return the message with status server for GET requests', (done) => {
            boilerRequest('/health', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                expect(body).to.eq('Server is up!');
                done();
            });
        });

        it('should return 405 for POST requests', (done) => {
            boilerRequest.post({
                url: '/health'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });
    });

});
