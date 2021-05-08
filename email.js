
var nodemailer = require('nodemailer');



// email on purchase
async function mail() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
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
    // let info = await transporter.sendMail({
    //   from: 'sitepplx@gmail.com', // sender address
    //   to: "tps1147@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  
  mail().catch(console.error);
  
  