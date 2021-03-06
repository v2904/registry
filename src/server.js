import restify from 'restify'
import mongoose from 'mongoose'

import HomeController from './controllers/HomeController'
import ItemController from './controllers/ItemController'

const SERVER_PORT = process.env.SERVER_PORT

mongoose.connect(process.env.MONGODB_URL)

const server = restify.createServer({
  name: process.env.SERVER_NAME
})

const dbConnection = mongoose.connection

dbConnection.on("error", (err) => console.error("Error connecting to mongodb: ", err));

dbConnection.on("open", () => console.log("MongoDB connected"));

server.use(restify.plugins.bodyParser())

server.get('/', HomeController.list)

server.post('/item', ItemController.create)
server.get('/item/:name', ItemController.read)
server.get('/item/:name/:version', ItemController.read)
server.get('/list/:name', ItemController.list)

server.listen(SERVER_PORT, console.log(`API running on port ${SERVER_PORT}`))