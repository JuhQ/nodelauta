/*
Module dependencies.
*/


(function() {
  var MongoStore, app, express, http, mongoconfig, mongoose, path, routes, threads, users;

  mongoose = require('mongoose');

  express = require("express");

  routes = require("./routes");

  threads = require("./routes/threads");

  users = require("./routes/users");

  http = require("http");

  path = require("path");

  mongoose = require('mongoose');

  mongoconfig = require("./utils/mongoconfig");

  MongoStore = require('connect-mongo')(express);

  app = express();

  app.configure(function() {
    app.set("port", process.env.PORT || 3000);
    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("nodelauta is sexier than a panda with herpes"));
    app.use(express.session({
      secret: 'yay for nodelauta',
      cookie: {
        maxAge: 60000 * 60 * 24 * 30 * 12
      },
      store: new MongoStore({
        db: "nodelauta"
      })
    }));
    app.use(app.router);
    return app.use(express["static"](path.join(__dirname, "public")));
  });

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  mongoconfig.config();

  app.get("/", routes.index);

  app.get("/api/boards", routes.boards);

  app.get("/api/boards/:id", threads.getThreads);

  app.get("/api/thread/:id", threads.getPosts);

  app.put("/api/board/createBoard", routes.createBoard);

  app.post("/api/post/:id", threads.post);

  app.put("/api/post/:id", threads.post);

  app.get("/register", users.register);

  app.post("/register", users.createAccount);

  app.get("/login", users.login);

  app.get("/login/:error", users.login);

  app.get("/logout", users.logout);

  app.post("/login", users.handleLogin);

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
