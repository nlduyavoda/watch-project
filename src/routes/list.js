const express = require("express");
const router = express.Router();

const listController = require("../app/Controller/listController");
router.get("/stored/products", listController.storedProducts);

module.exports = router;
