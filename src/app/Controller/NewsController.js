class NewsController {

//[Get]/News
    index(req, res) {
        res.render('home');
    }
}
module.exports = new NewsController;