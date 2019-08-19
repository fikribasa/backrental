require('dotenv').config();
//console.log(require);
 const mySql = require('mysql');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expres = require('express');
const router = require ('./routes');

const app= expres();
const port = process.env.PORT || 3030;
const nodeEnv = process.env.NODE_ENV || 'Production';

app.listen(port,() => {
    console.log(`Server is running on port in ${nodeEnv} mode on ${port}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

router(app);
module.exports=app;
