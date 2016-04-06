var log4js  = require('log4js');

module.exports = function(){

  var _getCategoryLogger = function(){
    var logger = null;

    log4js.loadAppender('file');
    log4js.addAppender(log4js.appenders.file(__dirname + '/../log/category.log'), 'category-log');

    logger = log4js.getLogger('category-log');
    logger.setLevel('DEBUG');

    return logger;
  }

  return { getCategoryLogger: _getCategoryLogger };

};
