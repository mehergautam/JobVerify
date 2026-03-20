const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: [
    {
      tool: {
        type: String,
        enum: ['fake-job-detector', 'resume-analyzer', 'interview-prep', 'offer-verifier', 'salary-checker'],
        required: true
      },
      data: mongoose.Schema.Types.Mixed,
      result: mongoose.Schema.Types.Mixed,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
