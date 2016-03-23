var Ticket  = require('../models/ticket'),
    loggers = require('../loggers/ticket.js')(),
    log     = loggers.getTicketLogger();

module.exports = function(app){

  _modifyTicket = function(req, res){
    res.render('./ticket/modify.twig', {

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

  _seeAllTickets = function(req, res){
    var query = Ticket.find().lean();

    query.exec(function(err, lst){
      if (err)
        res.send(err);

      res.render('./ticket/tickets.twig', {
        'list' : lst
      });
    });
  };

  _seeTicket = function(req, res){
    var query = Ticket.findOne().where('issue').equals(req.params.issue).lean(),
        json  = {};

    query.exec(function(err, lst){
      if(err)
        res.send(err);

      console.log(' Ticket > _seeTicket > ' + JSON.stringify(lst));

      res.render('./ticket/ticket.twig', {
        'item' : lst
      });
    });
  };

  _ticketCreate = function(req, res){
    res.render('./ticket/create.twig');
  };

  app.post('/api/tickets/', _saveTicket);

  app.get('/ticket/create/', _ticketCreate);
  app.get('/ticket/:issue/', _seeTicket);
  app.get('/ticket/modify/:issue/', _modifyTicket);

  app.get('/tickets/', _seeAllTickets);
}
