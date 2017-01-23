"use strict";

const express = require("express");
const json = require("body-parser").json;
const morgan = require("morgan");
const _ = require("lodash");
const cors = require("cors");

const PORT = process.env.PORT || 3999;
const API_RESPONSE_TIME = Number(process.env.API_RESPONSE_TIME || 1500);

const app = express();

module.exports = exports = app;

const search = require("./search");

app.use(json());
app.use(cors());
app.use(morgan("short"));

app.use(search);

app.post("/checkout", (req, res, next) => {
  const body = req.body;

  if(!/^\s*(\d{4}-?){4}\s*$/.test(body.number)) {
    return next(Error("invalid-card"));
  }

  res.send({ ok: true });
});


app.all("*", (req, res, next) => {
  res.status(404)
    .send({ error: "unknown-route" })
})

// error handling - turn any `invalid-` prefixed error into a 400
app.use((err, req, res, next) => {
  if(/^invalid-/.test(err.message)) {
    res.status(400)
        .send({ error: err.message })
  } else {
    next(err);
  }
});

if(require.main === module) {
  app.listen(PORT, () => console.log("server listening on ", PORT));
}
