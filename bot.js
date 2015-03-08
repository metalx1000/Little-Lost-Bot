// Create the configuration
var config = {
  channels: ["#lostbotland"],
  server: "irc.freenode.net",
  botName: "lilbot"
};

// Get the lib
var irc = require("irc");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  // Welcome them in!
  bot.say(channel, who + "...dude...welcome back!");
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
  var msg=text.toLowerCase();
  if(msg.indexOf("megacool")>=0){
    bot.say(config.channels[0], "Heck yeah I am!");
  }

  if(msg.indexOf("linux sucks")>=0){
    bot.say(config.channels[0], "You SUCK, " + from);
  }

});
