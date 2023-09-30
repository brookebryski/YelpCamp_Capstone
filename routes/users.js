const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get('/register', users.renderRegister)
    .post('/register', catchAsync(users.register))

router.route('login')
    .get('/login', users.renderLogin)
    .post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }, users.login))

router.get('/logout', users.logout); 

module.exports = router; 