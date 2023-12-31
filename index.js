require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000

const Book = mongoose.model('Book', mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
}));


mongoose.connect("mongodb+srv://mbimoad:bimo1940@cluster0.igtfyfn.mongodb.net/test", {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
})
.then(respon => console.log('connected'))
.catch(error => process.exit()); 


//Routes go here
app.get('/', async (req,res) => {
    const mybook = await Book.find();
    if (mybook) {
      res.json(mybook)
    } else {
      res.send("<a href='/tambah'>Tambah</a>");
    }
})


app.get('/tambah', async (req,res) => {
  Book.insertMany([
    {
      title: "Sons Of Anarchy",
      body: "Body text goes here...",
    },
    {
      title: "Games of Thrones",
      body: "Body text goes here...",
    }
  ]);
  res.json({"Data":"Added"})
})

//Connect to the database before listening
app.listen(PORT, () => {
  console.log("listening for requests");
})