const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  //in Mongodb, we have database then collections then documents
  //database is 'shop' we defined in database.js file
  //collection is 'products'. If it has the collection will write to it, it not then will create one
  //insertOne is method which we can find in mongoDb docs: https://docs.mongodb.com/manual/crud/
  //it takes object so insertOne({name: 'A book', price: 10.00}) ..
  //but since we have all this in 'this', we can directly pass the same
  save(){
    const db = getDb();
    return db.collection('products').insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  }

  //find is a method which returns all the records which might be quite huge hence mongodb does not directly returns all records
  //instead gives either cursor or toArray to determine how we want all the records
  //if it is huge, we can get it one by one by calling cursor
  //if we are sure, records are less, we can call toArray to get all the records at once
  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => console.log(err))
  }

}

module.exports = Product;
