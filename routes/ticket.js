var Ticket  = require('../models/ticket'),
    loggers = require('../loggers/ticket.js')(),
    log     = loggers.getTicketLogger();

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

    var query = Ticket.find().lean();

    query.exec(function(err, lst){
      if(err)
        res.send(err);

      res.render('./ticket/index.twig', {
        list: lst
      });
    });

  };

  _saveTicket = function(req, res){
    var date = new Date(),
        time = Math.round(date.getTime()/1000);

    log.debug( 'Parameters: ' + JSON.stringify(req.body) );
    log.debug( 'Date: ' + date );
    log.debug( 'Time: ' + time );

    var tckt = new Ticket({
      issue: time,
      title: req.body.title,
      description: req.body.description
    });

    log.debug ( 'Ticket: ' + JSON.stringify(tckt) );

    tckt.save(function(err){
      if(!err)
        console.log('Ticket creation successful. ');
      else
        console.log('ERROR: ' + err);
    });

    res.send(tckt);
  };

  _ticketCreate = function(req, res){
    res.render('./ticket/create.twig');
  };

  _ticketCreateCall = function(req, res){
  };

  app.get('/info/tickets/', _infoTickets);
  app.get('/api/tickets/', _getAllTickets);
  app.post('/api/tickets/', _saveTicket);

  app.get('/ticket/create/', _ticketCreate);
  app.post('/ticket/create/', _ticketCreateCall);
}
