
const{mutipleMongooseToObject} = require('../../util/mongoose');
const Products = require('../models/Products');



class ListController {

    //[Get]list/store/products
    storedProducts(req, res,next) {
        Products.find({})
                .then(products =>{
                            res.render('list/stored-Products',{
                                products: mutipleMongooseToObject(products)
                            })
                        })
                .catch(next)   
    }
}
    module.exports = new ListController;