var Ticket  = require('../models/ticket'),
    loggers = require('../loggers/ticket.js')(),
    log     = loggers.getTicketLogger();

module.exports = function(app){

  _modifyTicket = function(req, res){
    var query = Ticket.findOne().where('issue').equals(req.params.issue).lean();

    query.exec(function(err, item){
      if (err)
        res.send(err);

        log.debug( 'Issue: ' + JSON.stringify(item) );

      res.render('./ticket/modify.twig', {
        'item' : item
      });
    });
  };

  _modifyPutTicket = function(req, res){
    var query = Ticket.findOne().where('issue').equals(req.params.issue).lean();

    log.debug( 'New data: ' + JSON.stringify(req.body) );

    query.exec(function(err, item){
      if(err)
        res.send(err);

      log.debug( 'Issue: ' + JSON.stringify(item) );

      item.title        = req.body.title;
      item.description  = req.body.description;

      Ticket.update( {issue: item.issue}, { $set: {title: req.body.title, description: req.body.description} }, function(err){
        if (err)
          res.send(err);

        res.send(item);
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

  _seeAllTickets = function(req, res){
    var query = Ticket.find().sort({ issue: -1 }).lean();

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

      res.render('./ticket/ticket.twig', {
        'item' : lst
      });
    });
  };

  _ticketCreate = function(req, res){
    res.render('./ticket/create.twig');
  };

  app.get('/ticket/create/', _ticketCreate);
  app.get('/ticket/:issue/', _seeTicket);
  app.get('/ticket/modify/:issue/', _modifyTicket);
  app.get('/tickets/', _seeAllTickets);

  app.post('/api/tickets/', _saveTicket);

  app.put('/api/ticket/:issue/', _modifyPutTicket);
}
