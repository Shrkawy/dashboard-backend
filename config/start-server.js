const { connect } = require("mongoose");
const { success, error, ready } = require("consola");

const PORT = parseInt(process.env.PORT) || 8080;

const { DB_USER: user, DB_PASSWORD: pass, DB_NAME: name } = process.env;

const DB_URL = `mongodb+srv://${user}:${pass}@cluster0.5jwjv.mongodb.net/${name}?retryWrites=true&w=majority`;
/**
 * @param listen pass app.listen
 */
const startServer = async (app) => {
  try {
    // Start a connection with DB
    await connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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

module.exports = (app) => startServer(app);
