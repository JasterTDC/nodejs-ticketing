var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
  title:          String,
  description:    String
}, {versionKey: false});

module.exports = mongoose.model('Ticket', TicketSchema, 'Ticket');
