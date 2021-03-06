const mongoose = require('mongoose'),
  timestamps = require('mongoose-timestamp');

const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  todo: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    enum: [
      'pending', 'in progress', 'complete'
    ],
    default: 'pending'
  }
}, {collection: 'todos'});

// automatically generate createdAt and updatedAt timestamps and indexes without having to add additional code
TodoSchema.plugin(timestamps);

module.exports = exports = mongoose.model('Todo', TodoSchema);
