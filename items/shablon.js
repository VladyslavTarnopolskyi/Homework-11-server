'use strict';

const mongoose = require('mongoose');

const Shablon = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Shablon', Shablon);