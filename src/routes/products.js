const express = require('express')
const router = express.Router()


const productsController = require('../app/Controller/ProductsController')
router.get('/create',productsController.create)
router.get('/:id/edit',productsController.edit)
router.put('/:id/',productsController.update)
router.delete('/:id/',productsController.destroy)
router.post('/store',productsController.store)
router.get('/:slug',productsController.show)



module.exports = router;