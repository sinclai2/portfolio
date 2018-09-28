const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  body: String,
  category: String,
  upload-image: {
    data: Buffer, contentType: String
  },
  comments: [],
});

let Blog = module.exports = mongoose.model('Blog', blogSchema);
