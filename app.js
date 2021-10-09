const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//when using mongo
//created the user manually in db and fetching that user by id
// app.use((req, res, next) => {
//   User.findById('615eab1fc7caee6b996ad1c4')
//     .then(user => {
//       //since we are saving user data, we only get user data but we want all the methods also so..
//       //req.user = user;

//       //so now we are calling the User cinstructor, so req.user will have access to all the User methods also defined in User model
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

//when using mongoose
//created the user at the connect and fetching that user by id
//findById is a method given by mongoose and user that we get in result will have access to all mongoose methods also
app.use((req, res, next) => {
  User.findById('6161733cd2ec6bef280e800f')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//when using mongo
// mongoConnect(() => {
//   app.listen(3000);
// })

//when using mongoose
//findOne will return the first user it finds in users collection
mongoose.connect('mongodb+srv://MongoDbUser:MongoDbUser@cluster0.kij6e.mongodb.net/shopMongoDb?retryWrites=true&w=majority')
.then(result => {
  console.log('Connect to Mongo DB using Mongoose!!');
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Hina',
        email: 'test@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch(err => console.log(err));
