const path = require("path");
const fs = require("fs");


const commands = new Map();

const loadCmds = () => {
  const cmdsDir = path.join(__dirname, "..", "cmds");

  console.log("I'm so bored i did this shit. Hope you enjoy this.");
  fs.readdirSync(cmdsDir).forEach(cmd => {
    if(cmd.endsWith(".js")) {
    const {config, execRun} = require(path.join(cmdsDir, cmd));
      commands.set(config.name, execRun);
      console.log(`Loaded command: ${config.name}`);
    }
  })

  console.log("Credits: Renz");
  console.log("If you're interested in partaking in this project, you can contact me in facebook: Renz Mansueto (the guy with bachira pfp).")
}
global.commands = commands;
module.exports = loadCmds