const express = require("express");

const app = express();

const {authRouter} = require("./api");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(authRouter);

app.listen(3000);
