const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config();
const CUSTOMERID = process.env.CUSTOMER_ID;

//route imports
const countRoute = require('./routes/CountRoute');

//middleware
app.use(express.json());
app.use(
    cors({
      origin: true,
      credentials: true
    })
);

app.get('/geofence', cors(), async (req, res) => {
  res.send('okay');
});

//route middleware
app.use('/api/count', countRoute);

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