const express= require('express');
const dbConnect=require('./config');
const mongodb= require('mongodb');


const cors=require('cors')
const app=express();


// app.use(helmet());
app.use(express.json());
app.use(cors());

// to get all the data from Database
app.get('/getData',async (req,res)=>{
    let data= await dbConnect();
let result= await data.find().toArray();
res.send(result);
// console.log(result);
});

// getting data for a specific user using id

app.get("/getDataById/:id",async (req,res)=>{
let data= await dbConnect();
let result= await data.find({_id:new mongodb.ObjectId(req.params.id)}).toArray();
console.log(req.params);
console.log(result)
res.send(result);
});


// to add new data in db
app.post('/uploadData',async (req,res)=>
{
    let data= await dbConnect();
    let result= await data.insertOne(req.body); 
    res.send(result);
});


// to delete a task from db using Id

app.delete('/DeleteTask/:_id',async (req,res)=>{
let data =await dbConnect();
let result= await data.deleteOne(req.body);
res.send(result)
// console.log(result);
})

//to update a Task wrt task Id

app.put('/UpdateTask/:_id', async (req,res)=>{
    let data= await dbConnect();
    let result= await data.updateOne(
        {id:req.body.id},
        {$set:req.body});
        res.send(result);
})

app.listen(1023);


