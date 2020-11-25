

class NewsController {

//[Get]/News
    index(req, res) {


      Account.find({},function(err,accounts){
          if(!err)res.json(accounts)
           res.status(400).json({err:  'loi roi ban oi'})
      })
    }
}
module.exports = new NewsController;