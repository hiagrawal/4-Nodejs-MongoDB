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
}

module.exports = Product;
