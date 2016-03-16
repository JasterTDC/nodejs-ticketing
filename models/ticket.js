var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
  issue:          Number,
  title:          String,
  description:    String
}, {versionKey: false});

module.exports = mongoose.model('Ticket', TicketSchema, 'Ticket');
