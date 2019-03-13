import chai from 'chai'
import chaiHttp from 'chai-http'
import {app} from '../src/api/server.js'
import {config} from '../src/client/config'
import {dbConnection} from '../src/api/db/dbsqlite.js'
import {dbSync} from '../src/api/db/syncmodels.js'
import {dbFake} from '../src/api/db/fakerdata.js'

chai.use(chaiHttp)
chai.should()

let successfulLogin = {
  'username': 'george',
  'password': '123456'
}
let errorLogin = {
  'username': 'wrongusername',
  'password': 'wrongpassword'
}
let agent = chai.request.agent(app)

describe("Open Server", () => {
  describe("GET /", () => {
    before((done) => {
      dbConnection().then((message) => {
        console.log('Connection with db established')
        return dbSync()
      }).then(() => {
          return dbFake()
          console.log('Sync functions')
      }).then(() => {
          console.log('Add fake data')
          done()
      }).catch((error) => {
          console.log('Database Connection failed:' + error)
      })
    })
    it("should be open", (done) => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
    })
  })
})
describe("Successful Login", () => {
  describe("POST /", () => {
    it("should login successfully", () => {
      return agent
        .post('/user/login')
        .send(successfulLogin)
        .then((res) => {
          res.should.have.status(200)
          res.should.have.cookie('connect.sid')
          res.body.should.have.all.keys('user', 'message')
          res.body.user.should.have.all.keys('username', 'role')
          return agent.get('/')
        }, (error) => {
          error.should.have.status(401)
          error.body.should.have.property('message')
        }).then((res) => {
          res.should.have.status(200)
        })
    })
  })
})
describe("Error Login", () => {
  describe("POST /", () => {
    it("should error login", () => {
      return agent
        .post('/user/login')
        .send(errorLogin)
        .then((res) => {
          res.should.have.status(401)
          res.body.should.have.property('message', 'The username and password you entered did not match our records. Please double-check and try again.')
        }, (error) => {
          res.should.have.status(500)
        })
    })
  })
})