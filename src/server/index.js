// Import Depencies
const express = require('express');
const mongoose = require("mongoose");
const os = require('os');
const body_parser = require("body-parser");
const request = require('request')

const app = express();

app.use(express.static('dist'));
app.use(body_parser.json({ type: "*/*" }));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));


// Connect to Mongo
// Imported from a private directory to keep hidden from Github.
const mongoURL = require("../../private/dbcon");
mongoose.connect(mongoURL, {useNewUrlParser: true});

// Import api routes
const sessionAPIroutes = require("./api/session");
app.use(sessionAPIroutes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

function compile(s, l, vI) {
    const cI = '771d82a586d3f76e15e5c0e7d2d64bce'
    const cS = '37939d9e0029dafe91ca0c5170059f9f54c65a0cd207a9f15d951e4ba9017d3a' 
    const program = {
      script: s,
      language: l,
      versionIndex: vI,
      clientId: cI,
      clientSecret: cS
    };
    request({
      url: 'https://api.jdoodle.com/execute',
      method: 'POST',
      json: program
    },
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    });
  }
  
function isError(body) {
    if (body.slice(0, 10) === '\nTraceback') {
      return true;
    }
    return false;
}
