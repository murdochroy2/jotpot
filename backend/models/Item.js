const mongoose = require('mongoose');

const defaultArea = "home"
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  currentLocation: {
    type: String,
    required: true
  },
  previousLocation: {
    type: String,
    default: null
  },
  area: {
    type: String,
    default: defaultArea
  },
  updatedOn: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String
  }
});

const ItemModel = mongoose.model('items', ItemSchema);

module.exports = ItemModel;