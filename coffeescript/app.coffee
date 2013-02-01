
###
Module dependencies.
###
express = require("express")
routes = require("./routes")
threads = require("./routes/threads")
http = require("http")
path = require("path")
app = express()
app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "ejs"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("nodelauta is sexier than a panda with herpes")
  app.use express.session()
  app.use app.router
  app.use require("less-middleware")(src: __dirname + "/public")
  app.use express.static(path.join(__dirname, "public"))

app.configure "development", ->
  app.use express.errorHandler()

app.get "/", routes.index
app.get "/boards", routes.boards
app.get "/boards/:id", threads.getThreads
app.get "/thread/:id", threads.getPosts
app.post "/post/:id", threads.post
http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

