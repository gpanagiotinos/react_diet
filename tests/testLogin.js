import chai from 'chai'
import chaiHttp from 'chai-http'
import {app} from '../src/api/server.js'
import {config} from '../src/client/config'
import {dbConnection} from '../src/api/db/dbsqlite.js'
import {dbSync} from '../src/api/db/syncmodels.js'
import {dbFake} from '../src/api/db/fakerdata.js'

chai.use(chaiHttp)
chai.should()

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
describe("Login", () => {
  describe("POST /", () => {
    it("should login successfully", (done) => {
      let agent = chai.request.agent(app)
      agent
        .post('/user/login')
        .send({
          'username': 'george',
          'password': '123456'
        })
        .then((res) => {
          res.should.have.status(200)
          res.should.have.cookie('connect.sid')
          return agent.get('/')
        }).then((res) => {
          console.log('error')
          res.should.have.status(200)
          res.should.have.cookie('connect.sid')
          res.should.have.session('data')
          return Promise.resolve()
        }).then((res) => {
          done()
        }).catch((error) => {
          // console.log(error)
        })
    })
  })
})