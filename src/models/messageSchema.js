const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user:{
    emailId:mongoose.Schema.Types.ObjectId
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'system', 'assistant'],
  },
  content: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  }
}, { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

