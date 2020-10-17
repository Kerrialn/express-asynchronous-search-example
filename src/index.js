const express = require("express");
const path = require('path');
require("./Database/mongoose");
const jobRouter = require('./Route/job');
const searchRouter = require('./Route/search');
const hbs = require("hbs");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars templating engine and template location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(jobRouter);
app.use(searchRouter);

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
