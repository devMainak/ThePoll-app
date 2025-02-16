const express = require("express");
const cors = require("cors");

const initializeDatabase = require("./config/db.connection");

const app = express();

// cors config
const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

app.use("/polls", require("./routes/poll.routes"));

module.exports = app;
