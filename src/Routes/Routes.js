const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = require("../app");
const path = require('path')
const UsersModel = require("../Model/userModel");
const apartamentoModel = require("../Model/apartamentoModel");
const CasaModel = require("../Model/CasaModel");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'filesMock')
    },
    filename: function (req, file, cb){
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
require('../config/auth')(passport)

function authenticateMiddleware(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
}

router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/login', (req, res, next) => {
    res.render('login');
})


router.get('/register', (req, res, next) => {
    res.render('register');
})

router.post('/login/Auth', (req, res, next) => {
    
    let { email, password } = req.body;

    passport.authenticate("local", {
        successRedirect: '/user/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
});
router.post('/register/env', (req, res, next) => {

    const { name, lastname, telephone, email, whatsapp, password } = req.body;

    if (name !== '' && lastname !== '' && telephone !== '' && whatsapp !== '' && email !== '' && password !== '') {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        UsersModel.create({
            name: name,
            lastname: lastname,
            telephone: telephone,
            whatsapp: whatsapp,
            email: email,
            password: hash
        }).then(() => {
            res.redirect('/login');
        })
    }
    else {
        res.redirect('/Register');
    }
})

router.get('/anuncie/casa', authenticateMiddleware, (req, res, next) => {
    res.render('user/anuncio', {
        User: req.user,
    });
})

router.get('/anuncie/apartamento', authenticateMiddleware, (req, res, next) => {
    res.render('user/apartamento', {
        User: req.user,
    });
})
router.get('/anuncie/Casa/selected', authenticateMiddleware, async (req, res, next) => {
    res.render('user/Casa', {
        User: req.user,
        Casa: await CasaModel.findAll()
    });
})

router.get('/anuncie/Apartamento/selected', authenticateMiddleware, async (req, res, next) => {
    res.render('user/apartamentoSelected', {
        User: req.user,
        Apartamento: await apartamentoModel.findAll()
    });
})

router.post('/anuncie/apartamento/insert', authenticateMiddleware, upload.single('image_product'), (req, res, next) => {
    const { 
        id, description, 
        telephone, whatsapp,
        email, preco
    } = req.body;

   const path = req.file.path;
    console.log(path)

    apartamentoModel.create({
        Preco: preco,
        user_id: id,
        imagePath: path,
        description: description,
        telephone: telephone,
        whatsapp: whatsapp,
        email: email,
    }).then(() => {
        res.redirect('/user/home');
    })
})

router.post('/anuncie/casa/insert', authenticateMiddleware, upload.single('image_product'), (req, res, next) => {
    const { 
        id, description, 
        telephone, whatsapp,
        email, preco
    } = req.body;

    const path = req.file.path;
    console.log(path)

    CasaModel.create({
        Preco: preco,
        user_id: id,
        imagePath: path,
        description: description,
        telephone: telephone,
        whatsapp: whatsapp,
        email: email,
    }).then(() => {
        res.redirect('/user/home');
    })
})

router.get('/anuncie/apartamento/insert', authenticateMiddleware, (req, res, next) => {
    res.render('user/anuncio', {
        User: req.user,
    });
})



module.exports = router;