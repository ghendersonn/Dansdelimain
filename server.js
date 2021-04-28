const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use('/api',authRoutes);
app.use('/api',itemRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const stripe = require("stripe")("sk_test_51INoKRAFG88dmRAys2pjMte3S62Hrz7nH9fGSHZdJd20YQyEf5kSBfVQiyjF3IgmyUTh8PnwsKaY4F2kndA6JnkY00M0JyHfqa");


function calculateOrderAmount(products) {
  if (products >= 1) {
    let total = products * 100
    return total
  } else {
    return 100
  }
}

app.post("/create-payment-intent", async (req, res) => {
  let products = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
  
});



const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .then(console.log("connected"))
  .catch((err) => console.log(err));
