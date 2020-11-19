const newsRouter = require('./news')
const listRouter = require('./list')
const siteRouter = require('./site')
const productsRouter = require('./products')



function route(app){

    app.use('/list',listRouter)
    app.use('/news',newsRouter)
    app.use('/products',productsRouter)
    app.use('/',siteRouter)
      

}
module.exports = route;