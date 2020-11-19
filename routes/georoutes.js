var express = require('express');
const { promises } = require('fs');
const { resolve } = require('path');
var router = express.Router();
var _City = require('../geomodel');


router.post('/addcity', async function(req, res) {
    try {
        // let bodyArr = [];
        // bodyArr = req.body;
        let objcounter = 0;

        req.body.forEach(async element => {
            let citypoint = {
                type: element.geo.type,
                coordinates: element.geo.coordinates
            };
            let city = new _City({
                name: element.name,
                geo: citypoint
            });
            await city.save(function(err, doc) {
                if (err) {
                    throw err;
                } else {
                    objcounter++;
                    if (req.body.length == objcounter) {
                        res.json({ msg: objcounter + ' Object(s) saved.' });
                    }
                }
            });
        });
    } catch (ex) {
        res.json({ erm: ex });
    }
});
router.get('/getgeobject', async function(req, res) {
    _City.find({ 'name': "Yerevan" }, function(err, geo) {
        if (err) return next(err);
        res.json(geo);
    });
});
router.get('/getge_circle_object', async function(req, res) {
    _City.find({
        geo: {
            $geoWithin: {
                $geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [37.95698083189221, 43.8960193181161],
                            [39.276155793930315, 36.18091045232497],
                            [46.31175559146704, 34.67885003694292],
                            [50.26928047758144, 40.58263779907827],
                            [50.79695046239667, 44.211474170431806],
                            [37.95698083189221, 43.8960193181161]
                        ]
                    ]
                }
            }
        }
    }, function(err, geo) {
        if (err) return next(err);
        res.json(geo);
    });
});

module.exports = router;


// havaqel shrjanagcov poisk ani keter@