const express = require('express');
const routers = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
var axios = require("axios").default;
const UsersModel = require("../Model/userModel");
const aparatmentoModel = require("../Model/apartamentoModel");
const casaModel = require("../Model/CasaModel");

routers.get('/home', async (req, res, next) => {
    res.render('user/home', {
        User: req.user,
        Apartamento: await aparatmentoModel.findAll(),
        Casa: await casaModel.findAll()
    });
})


module.exports = routers;
