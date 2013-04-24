var express = require('express');
var app = module.exports = express.createServer();
app.everyauth = require('everyauth');

app.mongoose = require('mongoose');

var config = require('./config.js')(app, express);

var models = {};
models.examples = require('./models/example')(app.mongoose).model;

require('./routes')(app, models);

var phantom = require('phantom');
phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open("http://www.google.com", function(status) {
      console.log("opened google? ", status);
      return page.evaluate((function() {
        return document.title;
      }), function(result) {
        console.log('Page title is ' + result);
        return ph.exit();
      });
    });
  });
});

app.listen(process.env.PORT || 3000);

