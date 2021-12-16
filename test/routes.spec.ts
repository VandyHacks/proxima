import * as chai from 'chai';
import { expect } from 'chai';
import app from '../src/app';

import chaiHttp = require('chai-http');

describe('routes', () => {
  describe(`GET /`, () => {
    it('should error on the default route with a 401', done => {
      chai
        .request(app)
        .get(`/`)
        .end((err, res) => {
          expect(res.status).to.eql(401);
          done();
        });
    });
  });

  describe(`GET /healthcheck`, () => {
    it('should healthcheck', done => {
      chai
        .request(app)
        .get(`/healthcheck`)
        .end((err, res) => {
          isOk(err, res, 200, 'text/plain');
          done();
        });
    });
  });
});

const isOk = (err: any, res: any, status = 200, type = 'application/json') => {
  expect(err).to.not.exist;
  expect(res.status).to.eql(status);
  expect(res.type).to.eql(type);
};
