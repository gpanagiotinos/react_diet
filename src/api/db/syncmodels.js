import models from '../models/init.js'


async function dbSync () {
    await models.user.sync({force: true})
    await models.role.sync({force: true})
}
module.exports = dbSync