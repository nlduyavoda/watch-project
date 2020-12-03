const express = require("express");
const router = express.Router();
const productsController = require("../app/Controller/ProductsController");
const Products = require("../app/models/Products");
const Cart = require("../app/models/cart");
const { route } = require("./news");

router.get("/create", productsController.create);
router.get("/:id/edit", productsController.edit);
router.put("/:id/", productsController.update);
router.delete("/:id/", productsController.destroy);
router.post("/store", productsController.store);
router.get("/:slug", productsController.show);
router.get("/add-to-cart/:id/", function (req, res) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
  Products.findById({ _id: req.params.id }, function (err, products) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(products, products.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/cart", function (res, req, next) {
  if (!req.session.cart) {
    return res.render("shop/cart", { products: null });
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/cart", { products: cart.generateArray(),layout: 'detail.hbs' });
});

module.exports = router;
