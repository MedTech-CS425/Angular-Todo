const express = require('express');
const path = require('path')
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
app.use(express.static(__dirname + '/../dist/angularTodo'));
mongoose.connect('mongodb+srv://admin:admin@cluster0.iglhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MOngoDb');
});

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Todo = mongoose.model('todo', TodoSchema)

app.get('/todo', async (req,res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});
app.post('/todo', async (req,res)=> {
  await Todo.create(req.body);
  const todos = await Todo.find();
  res.status(201).json(todos)
});
app.put('/todo/:id', async (req,res)=> {
  await Todo.findByIdAndUpdate(req.params.id, req.body);
  const todos = await Todo.find();
  res.status(201).json(todos)
});
app.delete('/todo/:id', async (req,res)=> {
  await Todo.findByIdAndRemove(req.params.id);
  const todos = await Todo.find();
  res.status(201).json(todos)
});
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/angularTodo/index.html'))
})

app.listen(process.env.PORT || 3000)