const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',  
  }],
  model: {
    type: String,
    default: 'llama3-8b-8192',  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;