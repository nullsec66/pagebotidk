const fs = require("fs")
const {join} = require("path")
const loadCmds = require("./loadCmds.js")
function verifyToken(req,res) {
  const hookToken = "pagebot";
  
      const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
  if(mode && token == hookToken) {
   console.log("Webhook token verified.")
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken