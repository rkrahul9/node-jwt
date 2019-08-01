require('dotenv').config();
const express = require('express'),
  app = express(),
  port = process.env.PORT,
  router = express.Router(),
  routes = require('./routes'),
  bodyParser = require('body-parser'),
  db = require('./config/db');

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/api', router);
routes(router)

app.listen(port, () => console.log(`Express app listening on port ${port}!`))

