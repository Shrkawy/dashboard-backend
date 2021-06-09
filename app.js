const express = require("express");
const path = require("path");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const customersRoutes = require("./routes/customers-routes");
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const ordersRoutes = require("./routes/orders-routs");
const HttpError = require("./middlewares/http-error");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/customers", customersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

app.use((req, res, next) => {
  res.status(404).send("page not found");
});

const port = 8080;

// app.listen(process.env.PORT || port, () => {
//   console.log(`your server running on port: ${port}`);
// });

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5jwjv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(process.env.PORT || port, () => {
      console.log(`your server running on port: ${port}`);
    });
  })
  .catch((err) => console.log(err));
