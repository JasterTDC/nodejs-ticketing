
module.exports = function(app){

  _main = function(req, res){
    res.render('index.twig');
  };

  app.get("/", _main);
}
