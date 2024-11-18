const fs = require("fs");
const path = require("path");
const handleMessage = require("./handler/handleMessage.js");
const main = (req,res) => {
  const body = req.body;
  if(body.object == "page") {
    body.entry.forEach(ent => {
      const messageEvents = ent.messaging;

      
    
      messageEvents.forEach(async event => {
        
        if(event.message && event.message.text) {
          await handleMessage(event);
        }
      })
    })
    res.status(200).send("EVENT_RECEIVED")
  } else {
    console.log("what")
    res.sendStatus(404)
  }
}

module.exports = main
