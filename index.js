const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middlewere
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
// connect to  database


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfn4m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
      await client.connect();
      const serviceCollection = client.db('geniusCar').collection('service');
try{
      // find users from data base
app.get('/service',async(req,res)=>{
const query = {};
const cursor = serviceCollection.find(query);
const services = await cursor.toArray();
res.send(services);

})
// find user from data base
app.get('/service/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const service = await serviceCollection.findOne(query);
      res.send(service);
})
// post data to database
app.post('/service',async(req,res)=>{
const newService = req.body;
const result = await serviceCollection.insertOne(newService);
res.send(result);
})

// delete data from database
 app.delete('/service/:id',async(req,res)=>{
       const id = req.params.id;
       const query = {_id:ObjectId(id)};
       const result =await serviceCollection.deleteOne(query);
       res.send(result); 
    

 })

}
finally{

}
}
run().catch(console.dir);


app.get('/',(req,res)=>{
      res.send('hello node js world')
})
 app.listen(port,()=>{
       console.log('listening port ',port);
 })
