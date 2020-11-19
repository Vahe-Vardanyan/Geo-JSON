var express = require('express');
var router = express.Router();
var fs = require('fs');
var _City = require('../geomodel');


router.get('/search', async function(req, res) {
    // await PointModel.find({ name: 'Yerevan' }).exec(function(err, docs) {
    //     res.json(docs)
    // })
    _City.find({}, { 'name': "Yerevan" }, function(err, geo) {
        if (err) return next(err);
        res.json(geo);
    });
});

router.get('/', function(req, res) {
    res.render('index.html');
});



module.exports = router;