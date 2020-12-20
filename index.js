const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('./routes');


const bodyParser = require('body-parser');


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', apiRouter);

app.set('port', process.env.PORT || 3000);



if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log('Server on port ' + app.get('port') + ' on dev');
    });
}

module.exports = app;