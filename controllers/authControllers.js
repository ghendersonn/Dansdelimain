const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const crypto = require( 'crypto');
const nodemailer = require('nodemailer');



// signup
module.exports.signup = (req,res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({ name, email, password });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user._id },
                            config.get('jwtsecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    });
            })
        })
    })
}


// login
module.exports.login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
}

// get user
module.exports.get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

// forgot password 

module.exports.forget_passwords = (req, res) => {
    if (req.body.email === '') {
        res.status(400).send('email required');
      }
      console.error(req.body.email);
      User.findOne(
        {
          email: req.body.email,
        },
      ).then((user) => {
        if (user === null) {
          console.error('email not in database');
          res.status(403).send('email not in db');
        } else {
          const token = crypto.randomBytes(20).toString('hex');
          user.update({}, {$set: {resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 36000000}});
  
          const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            secure: false,
            service: 'gmail',
            auth: {
                user: 'sitepplx@gmail.com',
                pass: 'Potishot69'
            } // true for 465, false for other ports,
            });
  
          const mailOptions = {
            from: 'sitepplx@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:3000/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };
  
          console.log('sending mail');
  
          transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
              console.error('there was an error: ', err);
            } else {
              console.log('here is the res: ', response);
              res.status(200).json('recovery email sent');
            }
          });
        }
      });
}


// Reset Password

module.exports.reset_passwords = (req, res) => {
    
    User.findOne(
        {
          resetPasswordToken: req.query.resetPasswordToken,
          resetPasswordExpires: {
            $gt: Date.now(),
          },
      }).then((user) => {
        console.log(user)
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(403).send('password reset link is invalid or has expired');
        } else {
          res.status(200).send({
            username: user.email,
            message: 'password reset link a-ok',
          });
        }
      });
}

module.exports.update_password = (req, res) => {

    BCRYPT_SALT_ROUNDS = 12;
    User.findOne(
        {
          username: req.query.username,
          resetPasswordToken: req.query.resetPasswordToken,
        },
      ).then(user => {
        if (user == null) {
          console.error('password reset link is invalid or has expired');
          res.status(403).send('password reset link is invalid or has expired');
        } else if (user != null) {
          console.log('user exists in db');
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
              user.update({
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
              });
            })
            .then(() => {
              console.log('password updated');
              res.status(200).send({ message: 'password updated' });
            });
        } else {
          console.error('no user exists in db to update');
          res.status(401).json('no user exists in db to update');
        }
      });
}