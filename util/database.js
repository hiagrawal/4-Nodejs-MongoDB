const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//we are using callback here bcz we need to call this function in appjs and start server only when connected to database
const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://MongoDbUser:MongoDbUser@cluster0.kij6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected to MongoDB server!');
    callback(client);
  })
  .catch(err => console.log(err));
}

module.exports = mongoConnect;