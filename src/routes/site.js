const express = require('express')
const router = express.Router()


const siteController = require('../app/Controller/SiteController')
router.get('/search',siteController.search)
router.get('/cookie',function(req,res,next){
    res.cookie('user-id','12345')
    res.send('hello')
})
router.get('/',siteController.index)




module.exports = router;