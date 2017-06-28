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
  describe('the POST method', () => {
    it('should create a category', (done) => {
      request('localhost:' + port)
      .post('/api/categories')
      .send({ keyword: 'surfing' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.keyword).to.eql('surfing');
        done();
      });
    });
  });

  describe('the GET method', () => {
    it('should search for videos based on the category', (done) => {
      request('localhost:' + port)
      .get('/api/categories')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(typeof(res.body)).to.eql('object');
        done();
      });
    });
  });

});
