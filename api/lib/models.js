const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  link: String,
  featured: Boolean,
});

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = { Project, Message };
