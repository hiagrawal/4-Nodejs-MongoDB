const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

//we are using callback here bcz we need to call this function in appjs and start server only when connected to database
//IN the link, 'shop' is the database here, so if it exists, it will write to it else will create one
const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://MongoDbUser:MongoDbUser@cluster0.kij6e.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected to MongoDB server!');
    _db = client.db();
    callback();
  })
  .catch(err => console.log(err));
}

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No Database Found!';

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;