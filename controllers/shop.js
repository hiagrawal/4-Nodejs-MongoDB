const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {

  //when using mongo
  // Product.fetchAll()
  //   .then(products => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

    //when using mongoose
    //mongoose gives us find method which can be used to get all products
    //can pass any condition to filter out the data
    //also, it gives us back a cursor to iterate over the results one by one uisng next
    Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });

};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  //findById is a method defined by us when using mongo
  //Now it is the same method given by mongoose to find any product
  //and we can just pass the prodId as string only, and mongoose will convert it into ObjectId as needed by mongodb
  //so all our code remains the same even when using mongoose with defining any method
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {

  //when using mongo
  // Product.fetchAll()
  //   .then(products => {
  //     res.render('shop/index', {
  //       prods: products,
  //       pageTitle: 'Shop',
  //       path: '/'
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

    //when using mongoose
    Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  //when using mongo
  // req.user.getCart()
  //   .then(products => {
  //     console.log(products);
  //         res.render('shop/cart', {
  //           path: '/cart',
  //           pageTitle: 'Your Cart',
  //           products: products
  //         });
  //       })
  //   .catch(err => console.log(err));   
  
  //when using mongoose (.execPopulate)
  req.user
  .populate('cart.items.productId')
  .then(user => {
      console.log(user);
      console.log(user.cart.items);
      const products = user.cart.items;
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
    .catch(err => console.log(err));   
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then(result => {
    console.log(result);
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  //when using mongo
  // req.user.deleteItemFromCart(prodId)
  //   .then(result => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => console.log(err));

  //when using mongoose
  req.user.removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {

  //when using mongo
  // req.user.addOrder()
  //   .then(result => {
  //     res.redirect('/orders');
  //   })
  //   .catch(err => console.log(err));

  //when using mongoose
  req.user.populate('cart.items.productId')
  .then(user => {
      console.log(user);
      console.log(user.cart.items);
      const products = user.cart.items.map(i => {
        return {quantity: i.quantity, product: {...i.productId}};
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
