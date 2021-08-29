var express = require('express');
var router = express.Router();
const dburl = 'mongodb://superuser:789110a@47.102.47.144:27017'
const MongoClient = require('mongodb').MongoClient
const email = require('../libs/sendEmail.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/show', function (req, res, next) {
    res.render('show');
});

router.get('/showdata', function (req, res, next) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) throw err;
        console.log("database conncet!");
        const homework = db.db('homework')
        homework.collection('registration4.1').find().toArray((err,result) => {
            if(err) throw err
            res.send(result)
            db.close()
        })
    });
});

router.post('/reg', function (req, res, next) {
    let html = `<p>Hi, ${req.body.firstName}  ${req.body.lastName},  welcome registration success</p>`
    email.sendMail(req.body.email, html, (state)=>{
        console.log(true);
    })

    MongoClient.connect(dburl, function (err, db) {
        if (err) throw err;
        console.log("database conncet!");
        const homework = db.db('homework')
        homework.collection('registration4.1').insertOne(req.body, (err, result) => {
            if (err) throw err
            console.log('add success');
            res.send('insert success')
            db.close()
        })
    });
});

module.exports = router;
