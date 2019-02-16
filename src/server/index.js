// Import Depencies
const express = require('express');
const mongoose = require("mongoose");
const os = require('os');
const body_parser = require("body-parser");

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
