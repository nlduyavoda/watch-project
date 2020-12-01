const { mongooseToObject } = require("../../util/mongoose");
const Products = require("../models/Products");
const Cart = require("../models/cart");

class ProductsController {
  //[Get]/products/slug
  show(req, res, next) {
    Products.findOne({ slug: req.params.slug })
      .then((products) =>
        res.render("products/show", { products: mongooseToObject(products), layout: 'detail.hbs' })
      )
      .catch(next);
  }

  //[Get]/products/create
  create(req, res, next) {
    res.render("products/create");
  }
  //[Get]/products/:id/edit
  edit(req, res, next) {
    Products.findById(req.params.id)
      .then((products) =>
        res.render("products/edit", { products: mongooseToObject(products) })
      )
      .catch(next);
  }
  //[put]/products/:id/
  update(req, res, next) {
    Products.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/list/stored/products"))
      .catch(next);
  }
  //[delete]/products/:id/
  destroy(req, res, next) {
    Products.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[POST]/products/store
  store(req, res) {
    const products = new Products(req.body);
    products
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  cart(req, res) {
    var productId = req.params.id;
    var cart = new cart(req.session.cart ? req.session.cart : {});

    Products.findById(productId, function (err, Products) {
      if (err) {
        return res.redirect("/");
      }
      cart.add(Products, Products.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/");
    });
  }
}
module.exports = new ProductsController();
