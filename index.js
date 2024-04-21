const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');

app.use(express.json());

// new user registration
app.post('/register', async (req, res) => {
   let exist = await client.db("usersample").collection("userdetail").findOne({
     username: req.body.username
   })
 
   if (exist) {
     res.status(400).send("username already exist")
   } else {
     const hash = bcrypt.hashSync(req.body.password, 10);
 
     let result = await client.db("usersample").collection("userdetail").insertOne(
      {
        username: req.body.username,
        password: hash,
      }
    )
    res.send(result)
  }
})

// user login 
app.post('/login', async (req, res) => {
   if (req.body.username != null && req.body.password != null) {
     let result = await client.db("usersample").collection("userdetail").findOne({
       username: req.body.username
     })
 
     if (result) {
       if (bcrypt.compareSync(req.body.password, result.password) == true) {
         res.send("Welcome back " + result.username)
       } else {
         res.status(401).send('wrong password')
       }
      } 
      else {
       res.status(401).send("username is not found")
      }
   } else {
     res.status(400).send("missing username or password")
   }
 })

app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}`);
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://minli:minli0327@cluster0.qisckua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally{}
}
run().catch(console.dir);
