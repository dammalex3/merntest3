require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const formData = require('express-form-data');
const cors = require('cors');
const keys = require("./keys.js");
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;
const app = express()

var db = require("./models");

// if (process.env.NODE_ENV === "production") { app.use(express.static("client/build")); }

cloudinary.config({ 
  cloud_name: keys.cloudify.cloud_name, 
  api_key: keys.cloudify.api_key, 
  api_secret: keys.cloudify.api_secret
})

app.use(formData.parse())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.post("/api/users/login", function (req, res) {
  db.Users.findAll({
    include: [db.Events],
    where: {
      userName: req.body.userName,
      pw: req.body.passWord
    }
  }).then(function (dbUsers) {
    console.log(dbUsers)
    if (dbUsers.length < 1) {
      res.json(false)
    } else {
      res.json(dbUsers[0].dataValues.id);
    }
  });
});

app.post('/api/pic', function(req, res) {
  cloudinary.uploader.upload(req.files[0].path, function(error, result) {
    image_url = result.url;
    db.Posts.create({
      picture_url: result.url,
      EventId: "2"
    }, {
        include: [db.Events]
    }).then(function (dbCreatePost) {
        console.log(JSON.stringify(dbCreatePost));
        res.json(dbCreatePost)
    })
    })
})

app.post('/api/message', function(req, res) {
  db.Posts.max('id')
    .then(function (response){
      db.Posts.update({
          message: req.body.message,
      }, {
          where: {
            id: response
          }
      }).then(function (dbCreatePost) {
          res.json(dbCreatePost)
      })
  })
})

app.post('/api/event', function(req, res) {
  console.log(JSON.stringify(req.body));
  db.Events.create({
    eventName: req.body.eventName,
    UserId: req.body.UserId
  }, {
      include: [db.Users]
  }).then(function (dbCreateEvent) {
      res.json(dbCreateEvent)
  })
})

app.get('/api/events/:UserId', function(req, res){
  db.Events.findAll({
    where: {
      UserId: req.params.UserId
    }
  }).then(function(data){
    res.json(data);
  });
})

app.get('/api/posts', function(req, res){
  db.Posts.findAll({
    where: {
      EventId: '2'
    }
  }).then(function(data){
    res.json(data);
  });
})

var syncOptions = { force: true };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});

module.exports = app;