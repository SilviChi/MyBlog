/* globals __dirname */

const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const messages = require('express-messages');

const applyTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../node_modules/');

    app.use('/libs', express.static(libsPath));

    app.use('/static', express.static(path.join(__dirname, '../../static/')));

    app.use(cookieParser('keyboard cat'));
    app.use(session({ cookie: { maxAge: 30*60*1000 } }));

    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });
};

module.exports = { applyTo };
