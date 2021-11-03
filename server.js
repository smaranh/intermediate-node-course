const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();
const User = require('./models/User');

mongoose.connect('mongodb://localhost/userData');

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  User.create({...req.body.newData}, (err, data) => respond(err, data, res))
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id, (err, data) => respond(err, data, res));
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(req.params.id, {...req.body.newData}, (err, data) => respond(err, data, res));
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(req.params.id, (err, data) => respond(err, data, res));
})

const respond = (err, data, res) => {
  if (err) {
    res.json({success: false, message: err});
  } else if (!data) {
    res.json({success: false, message: 'Not Found'});
  } else {
    res.json({success: true, data: data});
  }
}