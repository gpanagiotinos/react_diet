import chai from 'chai'
import chaiHttp from 'chai-http'
import {app} from '../src/api/server.js'
// import config from ''

chai.use(chaiHttp)
chai.should()

describe("Login", () => {
  describe("POST /", () => {
    it("should login successfully", (done) => {
      chai.request(app)
        .post('/user/login')
        .type('json')
        .send({
          'username': 'george',
          'password': '123456'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.should.have.cookie('sid')
          done()
        })
    })
  })
})