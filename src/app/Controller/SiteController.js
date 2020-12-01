const { model } = require("../models/Products");
const product = require("../models/Products");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  //[Get]/Home
  index(req, res, next) {
    product
      .find({})
      .then((products) => {
        res.render("home", {
          products: mutipleMongooseToObject(products),
        });
      })
      .catch(next);
  }

  //[Get]/search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
