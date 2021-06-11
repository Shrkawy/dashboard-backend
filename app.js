const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { join } = require("path");
const { connect } = require("mongoose");
const { success, error, ready } = require("consola");

// init app
const app = express();

// middlewares
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

const startApp = async () => {
  const PORT = process.env.PORT || 8080;
  const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5jwjv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  try {
    // Start connection with DB
    await connect(DB, {
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
