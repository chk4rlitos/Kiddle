const homeCtrl = {};

homeCtrl.renderHomer = (req,res) => {
    res.render('home');
}
homeCtrl.renderMessages = (req,res) => {
    res.render('partials/messages', {user:req.user.toObject()});
}
module.exports = homeCtrl;