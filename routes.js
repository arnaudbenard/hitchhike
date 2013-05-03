module.exports = function(app, models){

  app.get('/', function(req, res){

    if (app.requireAuth === true && req.loggedIn === false)
      res.redirect('/auth/twitter');

    //get all the rides
    models.examples.find({}, function(err, docs){
      
      //render the index page
      res.render('index.jade', {
          locals: {
            title: 'Example',
            examples: docs
          }
      });

    });
  });

  var geohash = require("geohash").GeoHash;

  // route routing is very easy with express, this will handle the request for root directory contents.
  // :id is used here to pattern match with the first value after the forward slash.
  app.get("/:id",function (req,res)
      {
          //decode the geohash with geohash module
          var latlon = geohash.decodeGeoHash(req.params["id"]);

          var lat = latlon.latitude[2];

          var lon = latlon.longitude[2];

          var zoom = req.params["id"].length + 2;

          // now we use the templating capabilities of express and call our template to render the view, and pass a few parameters to it
          res.render("index.jade", { 
            locals: {
              lat:lat,
              lon:lon,
              zoom:zoom,
              geohash:req.params["id"]
            }
          });
      });


};  