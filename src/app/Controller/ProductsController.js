
const{mongooseToObject} = require('../../util/mongoose');
const Products = require('../models/Products');



class ProductsController {

    //[Get]/products/slug
        show(req, res,next) {
            Products.findOne({slug: req.params.slug})
            .then(products=>
                res.render('products/show',{products:mongooseToObject(products)})
            )
            .catch(next)
        }

          //[Get]/products/create
          create(req, res,next) {       
                res.render('productss/create')       
        }
          //[Get]/products/:id/edit
        edit(req, res,next) {       
            Products.findById(req.params.id)
            .then(products=>
                res.render('products/edit',{products:mongooseToObject(products)})
            )
            .catch(next)
        } 
        //[put]/products/:id/
        update(req, res,next) {       
            Products.updateOne({_id: req.params.id},req.body)
            .then(() =>res.redirect('/list/stored/products'))
            .catch(next)
        } 
        //[delete]/products/:id/
        destroy(req, res,next) {       
            Products.deleteOne({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next)
        } 
            //[POST]/products/store
            store(req, res) {
                const products = new Products(req.body);
                products.save()
                    .then(() => res.redirect('/'))
                    .catch(error => {
        
                    });
        }

    }
    module.exports = new ProductsController;