/*
Module dependencies.
*/


(function() {
  var app, express, http, mongoconfig, mongoose, path, routes, threads;

  mongoose = require('mongoose');

  express = require("express");

  routes = require("./routes");

  threads = require("./routes/threads");

  http = require("http");

  path = require("path");

  mongoose = require('mongoose');

  mongoconfig = require("./utils/mongoconfig");

  app = express();

  app.configure(function() {
    app.set("port", process.env.PORT || 3000);
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("nodelauta is sexier than a panda with herpes"));
    app.use(express.session());
    return app.use(app.router);
  });

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  mongoconfig.config();

  app.get("/", routes.index);

  app.get("/boards", routes.boards);

  app.get("/boards/:id", threads.getThreads);

  app.get("/thread/:id", threads.getPosts);

  app.put("/board/createBoard", routes.createBoard);

  app.post("/post/:id", threads.post);

  app.put("/post/:id", threads.post);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
