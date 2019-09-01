const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Proceso =require('../Proceso/to2alv');
const app= express();





/*app.get('/calculo', function(req, res){
   console.log("Proceso.to2alv");
  });*/

  router.post('/calculo',  (req, res) =>  {
      console.log(req.body);
      res.render('calc.ejs',{Titulo:'equisde', ip: 'ip'});
      router.post('/calculo', Proceso.to2alv);
   // res.send("Direccion ip:" + req.body.ip + "Mascara" + req.body.mask); 
    
 
});


/*router.get('/', Proceso.to2alv);

router.post('/calculador', function(req,res, next){
  res.redirect('views/calculo.html',);
    var id= req.body.id;
}); (Proceso.calculador);

//rutas*/
router.get('/calculadora',(req, res) => {
    res.render('calc.html', {Titulo: 'Calculadora'}); 
 
})

router.get('/',(req, res) => {
    res.render('index.html', {Titulo: 'Inicio'}); 
 
})



router.get('/memes',(req, res) => {
    res.render('memes.html', {Titulo: 'Memes'}); 
 
})





module.exports =router;