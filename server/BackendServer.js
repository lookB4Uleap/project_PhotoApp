var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.json());
app.use(cors());
// app.use(express.static('public'));

app.get('/img_collections', function (req, res) {
   fs.readFile( __dirname + "/" + "img_collections.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addToCollection', urlencodedParser, function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "img_collections.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      var len = data.length;
      console.log(req.body);
      // data["user4"] = user["user4"];
      // response = {};
      // response.user = req.body.user;
      // if (data.user)
      // response.props = {};
      // response.props.add = req.body.add;
      // response.props.phno = req.body.phno;
      var response = {};
      var user =  req.body.user;
      var exist =  false;
      var index;
      if (len !== 0) {
         index = data.findIndex((value,index,array) => {
         return (user === value.user)
         });   
      }

      if (index === -1 || len === 0) {
         response = {};
         response.user = user;
         response.images = [];
         response.images.push(req.body.image);
         data.push(response);  
      } 

      else {
         var flag;
         for (var i=0;i<data[index].images.length;i++) {
               if (req.body.image.date === data[index].images[i].date) {
                  data[index].images[i].name = req.body.image.name;
                  data[index].images[i].description = req.body.image.description;
                  console.log(data);
                  flag = false;
                  break;
               }
               else
                  flag = true;
         }
         if (flag)
         data[index].images.push(req.body.image);
      }

      fs.writeFile( __dirname + "/" + "img_collections.json",  JSON.stringify(data), 'utf8', function (err){
         if (err) {
            console.log(err);
         }
         else {
            // console.log( req.body );
            console.log( data );
            res.end( JSON.stringify(data));   
         }
      });
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "img_collections.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user;
      for (var i=0;i<users.length;++i) {
         if (users[i].user === req.params.id) {
            user = users[i];
            break;
         }
      }
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.delete('/deletePic', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "img_collections.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      var user = req.body.user;
      var picId = req.body.date;
      var userId;
      for (var i = 0; i < data.length; i++) {
         if (data[i].user === user) {
            userId = i;
         }
      }
      fs.writeFile( __dirname + "/" + "img_collections.json",  JSON.stringify(data), 'utf8', function (err){
         if (err) {
            console.log(err);
         }
         else {
            // console.log( req.body );
            console.log( data );
            res.end( JSON.stringify(data));   
         }
      });
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})