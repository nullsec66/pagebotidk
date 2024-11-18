const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());
const verifyToken = require("./core/verifyToken"); 
const core = require("./core/core.js")
const loadCmds = require("./core/loadCmds.js")

app.get("/webhook", verifyToken)
app.post("/webhook", core)
app.get("/", (req,res) => {
  res.send("sup mafaka")
})

const startServer = () => {
  loadCmds()
app.listen(3000)
}

startServer();
