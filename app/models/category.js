var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  dateCreated:    Date,
  dateModified:   Date,
  name:           String,
  parent:         Object
}, {versionKey: false});

module.exports = mongoose.model("Category", categorySchema, "Category");
