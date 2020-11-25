const newsRouter = require('./news')
const listRouter = require('./list')
const siteRouter = require('./site')
const productsRouter = require('./products')
const AuthRoute = require('../routes/auth')
const jsonwebtoken  = require('jsonwebtoken')






function route(app){
    app.use('/list',listRouter)
    app.use('/news',newsRouter)
    app.use('/products',productsRouter)
    app.use('/api',AuthRoute)
    app.use('/',siteRouter)
}
module.exports = route;