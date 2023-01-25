const {MongoClient}=require('mongodb');
const url='mongodb://localhost:27017';
const dataBaseName='Todo';
const client= new MongoClient(url);

async function dbConnect(){
    let result= await client.connect();
    db= result.db(dataBaseName);
    return db.collection('Data')
}

module.exports=dbConnect;