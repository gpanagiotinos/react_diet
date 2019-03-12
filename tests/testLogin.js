import chai from 'chai'
import chaiHttp from 'chai-http'
import {app} from '../src/api/server.js'

chai.use(chaiHttp)
chai.should()

describe("Login", () => {
  describe("POST /", () => {
    it("should login successfully", (done) => {
      chai.request(app)
        .post('/user/login')
        .type('json')
        .send({
          
        })
        .end((err, res) => {

        })
    })
  })
})