'use strict';

const express = require('express'),

    Item = require('./shablon'),

    router = express.Router();

router.get('/items', (req, res, next) => {

    Item.find({})
        .then(items => {
            res.json({items});
        })
        .catch(next);
});

router.post('/items', (req, res, next) => {
    new Item(req.body.item)
        .save()
        .then(item => {
            console.log(item);
            res.json({item});
        })
        .catch(next);
});

module.exports = router;