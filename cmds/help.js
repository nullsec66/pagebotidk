const config = {
  name: "help"
}


const execRun = ({send, event}) => {
  
  const commands = Array.from(global.commands.keys());
  const list = commands.map(cmd => `• ${cmd}`).join("\n")

  send(`Available commands are:\n\n${list}\n\nThere are ${commands.length} command(s) in total.`)

}

module.exports = {
  config,
  execRun
}