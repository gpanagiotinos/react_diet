import faker from 'faker'
import models from '../models/init.js'


async function dbSync () {
    await models.user.sync({force: false}).then(() => {
        for (let index = 0; index < array.length; index++) {
            models.user.create({
                username: faker.internet.userName,
                password: '123456'
            })
        }
    })
}
module.exports = dbSync