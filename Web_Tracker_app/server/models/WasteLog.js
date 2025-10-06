const mongoose = require('mongoose');

const wasteLogSchema = new mongoose.Schema({
  userId: String,
  date: { type: Date, required: true },
  recyclables: Number,
  compostables: Number,
  landfill: Number
});

module.exports = mongoose.model('WasteLog', wasteLogSchema);
