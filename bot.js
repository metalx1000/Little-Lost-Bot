// Configure bot
var config = {
  channels: ["#filmsbykris"],
  server: "irc.freenode.net",
  botName: "lilbot"
};

var irc = require("irc");

// Create the bot
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

// Listen for new people joining
bot.addListener("join", function(channel, who) {
  bot.say(channel, who + "...dude...welcome back!");
});

// Listen for messages and reply
bot.addListener("message", function(from, to, text, message) {

  var msg = check_msg(text);
  bot.say(config.channels[0], from + ": " + msg);

});


//checks for key phrases and replies when one matchs
function check_msg(msg){
  var fs = require('fs');
  var array = fs.readFileSync('talk.lst').toString().split("\n");
  for(i in array) {
    var bot=array[i].split("|");
    var bot_read = bot[0].toLowerCase();
    var bot_write = bot[1];
    if (msg.toLowerCase().indexOf(bot_read) != -1 && bot_write){
      return bot_write;
    }    
  }
}


