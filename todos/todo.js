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

module.exports = router;