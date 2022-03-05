const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
var bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectId;

var pass ='1YB5DO5NybSrKssS'
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// mongodb 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://crud:1YB5DO5NybSrKssS@cluster0.zxsua.mongodb.net/practice?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("practice").collection("workList");


  //02
  app.get('/products', (req, res)=>{
      collection.find({})
      .toArray((err, documents)=>{
          res.send(documents)
      })
  })

  //01
  app.post('/addProduct', (req, res)=>{
      const product = req.body;
      collection.insertOne(product)
      .then(result => {
          res.send('success')
      })
  })

  app.delete('/delete/:id', (req, res)=>{
    console.log(req.params.id)
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(res=>{
      console.log(res);
    })
  })
});




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})