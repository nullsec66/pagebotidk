const axios = require("axios");
const config = require("../../config.json");
const FormData = require("form-data");


async function handleMessage(event) {
  const log = {
    senderID: event.sender.id,
    recipientID: event.recipient.id,
    content: event.message,
  };
  console.log(log);
  async function send(message) {
    try {
      if (typeof message == "Object") {
        const { attachment, type } = message;
        if (!["audio", "video", "image"].includes(type.toLowerCase())) {
          return console.error("Invalid attachment type.");
        }

        
        const payload = {
          recipient: {
            id: log.senderID,
          },
          message: {
            attachment: {
              type: type.toLowerCase(), // Use 'media_share' for media attachments
              payload: {
                url: "https://media1.tenor.com/m/uA9NpxgqNKIAAAAd/gojo-satoru-satoru-gojo.gif",
                is_reusable: false
              },
            },
          },
        };
        const res = await axios.post(
          `https://graph.facebook.com/v21.0/me/messages`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${config.token}`,
            },
          },
        );
      } else {
        const res = await axios.post(
          `https://graph.facebook.com/v21.0/me/messages`,
          {
            recipient: {
              id: log.senderID,
            },
            message: {
              text: message,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${config.token}`,
            },
          },
        ); //send message as page
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }
  const commands = Array.from(global.commands.keys());
  if(commands.includes(event.message.text.toLowerCase())) {
  global.commands.forEach((execRun, name) => {
    // loop through command ans find out which one was called then execute its function
    if (name == event.message.text.toLowerCase()) {
      execRun({ send, event }); //pass the parameter
    }
  });
  } else {
    const {data } = await axios.get(`https://joshweb.click/api/gpt-4o?q=((You are Cloud AI)) User: ${event.message.text}&uid=${event.sender.id}`)
    send(data.result)
  }
}

module.exports = handleMessage;
