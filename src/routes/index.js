const express = require('express');
const router = express.Router();

const Proceso =require('../Proceso/to2alv');

//router.get('/', Proceso.to2alv);

router.post('/calculador', function(req,res, next){
    res.redirect('/calculadora');
    var id= req.body.id;
}); //Proceso.calculador);

//rutas
router.get('/',(req, res) => {
    res.render('index.html', {Titulo: 'Inicio'}); 
 
})

router.get('/calculo',(req, res) => {
    res.render('calculo.html', {Titulo: 'Aqui se hacen los calculos'}); 
 
})

router.get('/calculadora',(req, res) => {
    res.render('calc.html', {Titulo: 'Calculadora'}); 
 
})

router.get('/memes',(req, res) => {
    res.render('memes.html', {Titulo: 'Memes'}); 
 
})





module.exports =router;