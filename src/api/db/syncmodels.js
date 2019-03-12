import {dbModel} from '../models/init.js'

async function dbSync () {
    await dbModel.user.sync({force: true})
    await dbModel.role.sync({force: true})
}
export{dbSync}