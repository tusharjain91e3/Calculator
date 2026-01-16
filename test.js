const express=require('express')
const mongoose=require('mongoose')
const app = express()
const port = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://tusharjainmandoth:dfMqcQ4sRoc4xjxi@cluster0.iqkug7i.mongodb.net/todoDB')
  .then(() => console.log('MongoDB connected'))

const todoSchema=new mongoose.Schema({
  value: String
})

const Todo=mongoose.model('Todo',todoSchema)

const router = express.Router()
userRouter =express.Router();

router.get('/', (req, res) => {
  res.send('To do list is running!')
})

router.post('/create', async (req, res) => {
  console.log(req.body) 
  await Todo.create({ value: req.body.value })
  console.log('Todo item created')
  res.send('Created a new todo item')
})

router.put('/update', async(req, res)=>{
  await Todo.updateOne({},{$set:{value: req.body.value }})
  res.send(`Update to do item to: ${req.body.value}`)
})

router.delete('/delete', async(req, res) => {
  await Todo.deleteOne({})
  res.send(`Delete to do item`)
})

router.get('/see', async (req, res) => {
  const todo=await Todo.findOne()
  res.send(`Current to do item: ${todo ? todo.value : 'No to do item found'}`)
})

app.use('/todo', router);
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
