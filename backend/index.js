const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')

dotenv.config();

//import routes
const countRoute = require('./routes/CountRoute');

//middleware
app.use(express.json());
app.use(
    cors({
      origin: true,
      credentials: true
    })
);

//route middleware
app.use('/api/count', countRoute);

//start server and set port
var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

app.listen(port, () => {
  console.log("I'm listening at " + port + ' !');
});

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}
  
module.exports = app;