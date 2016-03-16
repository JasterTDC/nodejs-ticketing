var log4js = require('log4js');

module.exports = function(){

  var _getTicketLogger = function(){
    var logger = null;

    log4js.loadAppender('file');
    log4js.addAppender(log4js.appenders.file(__dirname + '/../log/ticket.log'), 'ticket-log');

    logger = log4js.getLogger('ticket-log');
    logger.setLevel('DEBUG');

    return logger;
  }

  return { getTicketLogger: _getTicketLogger };
};
