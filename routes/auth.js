const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
let registerValidation = require ('../validation/validation').registerValidation;
let loginValidation = require ('../validation/validation').loginValidation;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function createToken(user){
    const secret = user.password + "-" + user.createdAt;

    const token = jwt.sign({_id:user._id}, secret, { expiresIn: 3600 });

    return token;
}

const resetPasswordTemplate = (user, url) => {
    const from = process.env.MAILER_EMAIL_ID
    const to = user.email
    const subject = "Password Reset"
    const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>I heard that you lost your Socourt password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Socourt</p>
  `

    return { from, to, subject, html }
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
    }
})

// RECEIVE NEW PASS!
const receiveNewPassword = (req, res) => {
    const { userId, token } = req.params
    const { password } = req.body
    // highlight-start
    User.findOne({ _id: userId })
        .then(user => {
            const secret = user.password + "-" + user.createdAt
            const payload = jwt.decode(token, secret)
            if (payload.userId === user.id) {
                bcrypt.genSalt(10, function(err, salt) {
                    // Call error-handling middleware:
                    if (err) return
                    bcrypt.hash(password, salt, function(err, hash) {
                        // Call error-handling middleware:
                        if (err) return
                        User.findOneAndUpdate({ _id: userId }, { password: hash })
                            .then(() => res.status(202).json("Password changed accepted"))
                            .catch(err => res.status(500).json(err))
                    })
                })
            }
        })
        // highlight-end
        .catch(() => {
            res.status(404).json("Invalid user")
        })
}

router
    .route("/receive-new-password/:userId/:token")
    .post(receiveNewPassword)

router.post('/forgot-password', async (req,res) => {
    let userMail = req.body.email;

    let user = await User.findOne({"email":userMail});

    if(user){
        // send mail

        // Create and assign token
        const token = createToken(user);
        const url = `http://localhost:3000/password/reset/${user._id}/${token}`;
        const emailTemplate = resetPasswordTemplate(user,url);

        const sendEmail = () => {
            transporter.sendMail(emailTemplate, (err, info) => {
                if (err) {
                    res.status(500).json("Error sending email: " + err)
                }
                console.log(`** Email sent **`)
            })
        }
        sendEmail()
    }else{
        res.status(404).json("No user found with this email.");
    }
})

router.post('/register', async (req,res) => {
    const {error} = registerValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    
    try{
        const saveUser =  await user.save();
        return res.send({user: saveUser._id})
    }catch (e) {
        return res
            .status(400)
            .send(`${Object.values(e.keyValue)[0]} is not a valid information for the field "${Object.keys(e.keyValue)[0]}"`);
    }
})

router.post('/login', async(req,res) => {
    const {error} = loginValidation(req.body)
    if(!error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).send('Email or password is wrong.1');

    var validPassword = bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send('Email or password is wrong.2');

    // Create and assign token
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

    res.header('Bearer', token).send(token);
})

module.exports = router;
