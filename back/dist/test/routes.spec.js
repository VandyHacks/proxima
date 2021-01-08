"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chai_1 = require("chai");
const app_1 = require("./../app/app");
chai.use(require('chai-http'));
describe('routes', () => {
    after(() => Promise.resolve(app_1.server.close()));
    describe(`GET /`, () => {
        it('should error on the default route with a 401', done => {
            chai
                .request(app_1.server)
                .get(`/`)
                .end((err, res) => {
                chai_1.expect(res.status).to.eql(401);
                done();
            });
        });
    });
    describe(`GET /healthcheck`, () => {
        it('should healthcheck', done => {
            chai
                .request(app_1.server)
                .get(`/healthcheck`)
                .end((err, res) => {
                isOk(err, res, 200, 'text/plain');
                done();
            });
        });
    });
});
const isOk = (err, res, status = 200, type = 'application/json') => {
    chai_1.expect(err).to.not.exist;
    chai_1.expect(res.status).to.eql(status);
    chai_1.expect(res.type).to.eql(type);
};
//# sourceMappingURL=routes.spec.js.map