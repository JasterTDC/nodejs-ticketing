var Ticket = require('../models/ticket');

module.exports = function(app){

   _getAllTickets = function(req, res){
    var query = Ticket.find().lean();

    query.exec(function(err, lst){
      if(err)
        res.send(err);

      res.json(lst);
    });
  };

  _infoTickets = function(req, res){
    res.render('index.twig', {
      message: 'Master !'
    });
  };

  _saveTicket = function(req, res){
    console.log(req.body);

    var tckt = new Ticket({
      title: req.body.title,
      description: req.body.description
    });

    tckt.save(function(err){
      if(!err)
        console.log('Ticket creation successful. ');
      else
        console.log('ERROR: ' + err);
    });

    res.send(tckt);
  };

  app.get('/info/tickets/', _infoTickets);
  app.get('/api/tickets/', _getAllTickets);
  app.post('/api/tickets/', _saveTicket);
}
