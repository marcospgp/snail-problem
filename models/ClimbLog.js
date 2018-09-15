const mongoose = require('mongoose');

const climbLogSchema = new mongoose.Schema({
  h: String,
  u: String,
  d: String,
  f: String,
  result: String
}, { timestamps: true });

const ClimbLog = mongoose.model('ClimbLog', climbLogSchema);

module.exports = ClimbLog;
