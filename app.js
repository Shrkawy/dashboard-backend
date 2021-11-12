const express = require("express"),
  logger = require("morgan"),
  cors = require("cors"),
  passport = require("passport"),
  { join } = require("path");

require("dotenv").config();

// config passport
require("./config/passport")(passport);

// init app
const app = express();

// middlewares configs
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(passport.initialize());

// end-points
app.use("/api/", require("./routes/users-routes"));
app.use("/api/:userId/products", require("./routes/products-routes"));
app.use("/api/:userId/customers", require("./routes/customers-routes"));
app.use("/api/:userId/orders", require("./routes/orders-routes"));

// 404 error handler
app.use((req, res, next) => {
  return res.sendStatus(404);
});

// connect to MongoDB and start listening on port 8080
require("./config/start-server")(app);
