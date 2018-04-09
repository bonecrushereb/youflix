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
      const keyword = 'surfing';
      request('localhost:' + port)
      .get('/api/categories/' + keyword)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      });
    });
  });

  describe('routes that need a keyword in the db', () => {
    beforeEach((done) => {
      var newYoutube = new Youtube({ keyword: 'surfing' });
      newYoutube.save((err, data) => {
        console.log(err);
        this.youtube = data;
        done();
      });
    });
    afterEach((done) => {
      this.youtube.remove((err) => {
        console.log(err);
        done();
      });
    });

    it('should change the keyword\'s identity on a PUT request', (done) => {
      request('localhost:' + port)
      .put('/api/categories/' + this.youtube._id)
      .send({ keyword: 'javascript' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('keyword has been changed');
        done();
      });
    });

    it('should remove a keyword', (done) => {
      request('localhost:' + port)
      .delete('/api/categories/' + this.youtube._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('category deleted');
        done();
      });
    });

    describe('server error', () => {
      it('should error on a bad route', (done) => {
        request('localhost:' + port)
        .get('/badroute')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res.text).to.eql('Page not found');
          done();
        });
      });
    });
  });
});
