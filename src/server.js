const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const Message = require('./models/message');
// needed to capture user data from form
let bodyParser = require('body-parser');

let db = mongoose.connection;
mongoose.connect('mongodb://localhost/personal');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// check connection
db.once('open', () => {
  console.log('connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
  console.log(err);
});

// Message.create({
//   name: ' Earth',
//   email: 'elaothong@gmail.com',
//   message: 'Hi there',
//
// }, (err, msg) => {
//   if(err){
//     console.log(err);
//   }else{
//     console.log(msg);
//   }
// });

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/blogs', (req, res) => {
  res.render('blogs');
});

app.post('/', (req, res) => {
  Message.create(req.body.message, (err, message) => {
    if (err) {
      console.log(err);
    } else {
      console.log('meesage by ' + message.name + ' has been added to the database');
    }
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
