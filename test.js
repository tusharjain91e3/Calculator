const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('Mongodburl')
  .then(() => console.log('MongoDB connected'))

const todoSchema = new mongoose.Schema({
  value: String,  
  no: Number 
})

const Todo=mongoose.model('Todo', todoSchema)

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Todo API is running!')
})

router.post('/create',async(req, res) => {
  await Todo.create({value:req.body.value })
  res.send('Todo created')
})

router.get('/see',async(req, res) => {
  const todos =await Todo.find()
  res.send('All Todos')
  res.json(todos)
})

router.put('/update/:id', async(req, res) => {
  const doc = await Todo.findById(__id)
  if (!doc) return res.status(404).send('Todo not found')
  await Todo.updateOne({_id: __id}, {$set:{value}})
  res.send('Todo updated')
})

router.delete('/delete/:id', async (req, res) => {
  const doc = await Todo.findById(req.params.id)
  if (!doc) return res.status(404).send('Todo not found')
  await Todo.deleteOne({_id:req.params.id})
  res.send('Todo deleted') 
})

app.use('/todo', router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})