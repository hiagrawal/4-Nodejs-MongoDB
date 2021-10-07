const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email){
    this.name = username;
    this.email = email;
  }

  save(){
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  //Another alternative method findOne to use if we are sure that it will return only one value
  static findById(userId){
    const db = getDb();
    return db.collection('users').findOne({_id: new ObjectId(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => console.log(err))
  }

}

module.exports = User;
