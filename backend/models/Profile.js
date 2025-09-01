const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String]
});

const linksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  projects: [projectSchema],
  work: [String],
  links: linksSchema
});

module.exports = mongoose.model("Profile", profileSchema);
