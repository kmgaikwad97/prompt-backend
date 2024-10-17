const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'system', 'assistant'], 
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;