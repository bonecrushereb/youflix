const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');
const port = process.env.PORT = 5000;

const Youtube = require(__dirname + '/../models/youtube');


describe('the server', () => {
  before((done) => {
    setup(done);
  });
  after((done) => {
    teardown(done);
  });
});
describe('the POST methods', () => {
  after((done) => {
    teardown(done);
  });
  it('should search for videos')
});
