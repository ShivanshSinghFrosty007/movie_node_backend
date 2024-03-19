const espress = require('express');
const router = espress.Router();

const { MongoClient } = require('mongodb');
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.cjsivdu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

const authenticate = require('../auth/authKey');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const crypto = require('crypto');

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'utf8');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'utf8');

function decrypt(text) {
    var data = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

router.post("/:key/getuser", async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }
    const find = await client.db("moviedb").collection("users").findOne({ username: req.body.username });
    if (find) {
        if (req.body.password == find['password']) {
            res.json({ acknowledged: true });
        } else {
            res.json({ acknowledged: 'wrong' });
        }
    } else {
        res.json({ acknowledged: false });
    }
    console.log('get user');
});

router.post("/:key/mail", async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }

    const mail = req.body.mail;
    const findMail = await client.db("moviedb").collection("users").findOne({ mailID: mail });
    const findUser = await client.db("moviedb").collection("users").findOne({ username: req.body.username });

    if (findMail) {
        res.json("mailID already exist");
        return;
    }

    if (findUser) {
        res.json("username already exist");
        return;
    }

    otp = Math.floor(1000 + Math.random() * 9000);

    var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: mail,
        subject: `OTP is ${otp}`,
        text: `OTP for Movie Node is ${otp}`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        mailID: mail,
        sendOTP: otp,
    }
    console.log(otp);

    const token_send = jwt.sign(data, jwtSecretKey);
    res.json({ token: token_send });

});

router.post("/:key/verify", async function (req, res) {
    if (!authenticate(req.params.key, res)) {
        return;
    }

    const token = req.body.token;
    const otp = await decrypt(req.body.otpEnc);
    // const otp = req.body.otpEnc;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
        console.log(verified.mailID, verified.sendOTP);
        recOtp = verified.sendOTP
        if (otp == recOtp) {
            console.log("otp verified");
            adduser(req.body.username, req.body.password, req.body.mail);
            res.json({ otpack: 'verified' });
        } else {
            res.json({ otpack: 'wrong otp' });
        }
    } else {
        res.json({ otpack: 'error' });
    }

});

async function adduser (username_T, password_T, mailID_T) {
    const result = await client.db("moviedb").collection("users").insertOne({
        username: username_T,
        password: password_T,
        mailID: mailID_T,
    });
    console.log(result);
};

// hhea qsjz cbcc tahf

module.exports = router;