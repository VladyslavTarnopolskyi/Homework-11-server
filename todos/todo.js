'use strict';

const express = require('express'),

    Todo = require('./model'),

    router = express.Router();

router.get('/todo', (req, res, next) => {

    Todo.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(next);
});

router.post('/todo', (req, res, next) => {
    new Todo(req.body.todo)
        .save()
        .then(todo => {
            console.log(req.body.todo);
            res.json({todo});
        })
        .catch(next);
});
router.delete('/todo/:item', (req, res, next) => {
    Todo.remove({ item: req.params.item}, function (err) {
        if (err) {
            res.send(err);
        }
    })
        .catch(next);
});

module.exports = router;