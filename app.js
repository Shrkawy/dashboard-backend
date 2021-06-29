const express = require("express"),
  logger = require("morgan"),
  cors = require("cors"),
  passport = require("passport"),
  { join } = require("path"),
  { connect } = require("mongoose"),
  { success, error, ready } = require("consola");


// init app
const app = express();

// middlewares configs
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

// end-points
app.use("/api/customers", require("./routes/customers-routes"));
app.use("/api/products", require("./routes/products-routes"));
app.use("/api/users", require("./routes/users-routes"));
app.use("/api/orders", require("./routes/orders-routes"));

// 404 error handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 8080;
const { DB_USER: user, DB_PASSWORD: pass, DB_NAME: name } = process.env;
const DB_URL = `mongodb+srv://${user}:${pass}@cluster0.5jwjv.mongodb.net/${name}?retryWrites=true&w=majority`;

const startApp = async () => {
  try {
    // Start connection with DB
    await connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    success({
      message: "connected to database successfully",
      badge: true,
    });

    // Start listening for the server on PORT
    app.listen(PORT, () =>
      ready({ message: `your server running on port: ${PORT}` })
    );
  } catch (err) {
    error({
      message: "failed to connect with database",
      badge: true,
    });
  }
};

startApp();
