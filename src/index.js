const express =require('express');
const app = express();
const path = require ('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');




//configuracion

app.set('port', 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('html', require ('ejs').renderFile);
app.set('view engine','ejs');

  //COnfiguracion body-parser
  

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
 



//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));


//routes
app.use (require ('./routes/index'));

//static files

app.use(express.static(path.join(__dirname, 'Public')))


//escuchando servidor 

app.listen(app.get('port'), () => {
    console.log('Server on port' , app.get('port'));
} );