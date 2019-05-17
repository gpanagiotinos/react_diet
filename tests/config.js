import dotenv from 'dotenv'
var path = require('path')
var dotEnvPath = path.resolve('./test.env')
dotenv.config({ path: dotEnvPath})