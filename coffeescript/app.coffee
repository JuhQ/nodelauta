###
Module dependencies.
###
mongoose = require('mongoose')
express = require("express")
routes = require("./routes")
threads = require("./routes/threads")
users = require("./routes/users")
http = require("http")
path = require("path")
mongoose = require('mongoose')
mongoconfig = require("./utils/mongoconfig")
MongoStore = require('connect-mongo')(express)
app = express()

app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "ejs"
  #app.use express.favicon()
  #app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("nodelauta is sexier than a panda with herpes")
  #app.use express.session()

  app.use express.session
    secret:'yay for nodelauta'
    cookie: {maxAge: 60000 * 60 * 24 * 30 * 12} # one year
    store: new MongoStore
      db: "nodelauta"

  app.use app.router
  #app.use require("less-middleware")(src: __dirname + "/public")
  app.use express.static(path.join(__dirname, "public"))

app.configure "development", ->
  app.use express.errorHandler()


mongoconfig.config()

app.get "/", routes.index
app.get "/api/boards", routes.boards
app.get "/api/boards/:id", threads.getThreads
app.get "/api/thread/:id", threads.getPosts

app.put "/api/board/createBoard", routes.createBoard
app.post "/api/post/:id", threads.post
app.put "/api/post/:id", threads.post

# User login & registration
app.get "/register", users.register
app.post "/register", users.createAccount
app.get "/login", users.login
app.get "/login/:error", users.login
app.get "/logout", users.logout
app.post "/login", users.handleLogin

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
