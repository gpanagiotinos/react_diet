import fake from 'faker'
const models = require('../models/init.js')

async function dbFake () {
    for (let index = 0; index < 10; index++) {
        await models.user.build({
            username: fake.internet.userName,
            password: '123456',
            createdAt: fake.date.recent(),
            updatedAt: fake.date.recent()
        })
    }
}
module.exports = dbFake