require('dotenv').config()
const morgan = require('morgan'); //debug de las rutas del servidor
const { format } = require('timeago.js');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//----------DATABASE---------------------------------------------
const Grid = require("gridfs-stream")
const { mongoose,connection } = require('./config-database')



const express = require('express');
//----------IMPORT ROUTER----------------------------------------
indexRouter = require('./routes/index-router')
//----------INSTANCE EXPRESS-------------------------------------
const app = express();
//----------CONFIG PORTS-----------------------------------------
app.set('port',process.env.PORT || 3000)
//----------CONFIG TEMPLATE ENGINE-------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//----------MIDLEWARES-------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));//definiendo el directorio estatico
app.use(morgan('dev'));//aplicaion utiliza el modulo de morgan
app.use(express.urlencoded({extended: false}));//me permite entender los datos que se estan mandando desde los formularios

app.use(bodyParser.json());
app.use(methodOverride('_method'));
//----------MIDLEWARES-------------------------------------------
connection.once('open', _ => {
    // Iinit stream
    const gfs = Grid(connection.db,mongoose.mongo);
    gfs.collection('uploads');
     // use `app.locals` to store the result when it finishes
    app.locals.gfs = gfs;
    console.log("gfs has been created");
});


//Global variables
app.use((req,res,next)=>{
    // sintaxys app.locals.(nombre de la vairable globlal)
    app.locals.format = format;
    // colocar next para que continue con la ejecucion luego del middleware
    next();
});




//----------ROUTING-----------------------------------------
app.use('/',indexRouter);
app.listen(app.get('port'),()=>{ 
    console.log('Server on port '+ app.get('port')) 
    console.log('Please visit --> http://localhost:'+ app.get('port')) 
});