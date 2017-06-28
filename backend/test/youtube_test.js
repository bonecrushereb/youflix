const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');
const port = process.env.PORT = 5000;

const Youtube = require(__dirname + '/../models/youtube');

describe('the POST methods', () => {
  before((done) => {
    setup(done);
  });
  after((done) => {
    teardown(done);
  });
  it('should create a category', (done) => {
    request('localhost:' + port)
    .post('/api/categories')
    .send({ keyword: 'surfing' })
    .end((err, res) => {
      expect(err).to.eql(null);
      done();
    });
  });
});
