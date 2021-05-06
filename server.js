const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
var nodemailer = require('nodemailer');

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

const stripe = require("stripe")("sk_test_51IN7khGVhP2rcc7nk5psNjLWxh8hYDtvdJjrGe3JlEIlOFYjaQvQ3yiGixPZV9PB71Lid3hPj10r3bcYOuyU0Vvl001eRp4Yf9");


function calculateOrderAmount(products) {
  if (products >= 1) {
    let time = new Date()
    let hour = time.getHours()
    console.log(hour)
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
    amount: calculateOrderAmount(products.total.toFixed(2)),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
  
});





// email on purchase
async function mail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    service: 'gmail',
    auth: {
          user: 'sitepplx@gmail.com',
          pass: 'Potishot69'
         } // true for 465, false for other ports,
  });
  // E6CA1D42B1FEC0CF1C68DCC67FE1F38A1435
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'sitepplx@gmail.com', // sender address
    to: "tps1147@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mail().catch(console.error);








const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port))
  .then(console.log("connected"))
  .catch((err) => console.log(err));
