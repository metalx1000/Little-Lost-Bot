// Configure bot
var config = {
  channels: ["#filmsbykris"],
  server: "irc.freenode.net",
  botName: "lilbot"
};

var irc = require("irc");
var fs = require('fs');
var morse = require('morse');

// Create the bot
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

// Listen for new people joining
bot.addListener("join", function(channel, who) {
  var hello = random_hello();
  //bot.say(channel, who + ", hey. Welcome!");
  bot.say(channel, who + ", " + hello);
});

// Listen for messages and reply
bot.addListener("message", function(from, to, text, message) {

  var msg = check_msg(text);
  if ( msg ){
    bot.say(config.channels[0], from + ": " + msg);
    console.log(from + ": " + msg);
  }
  else if ( text.toLowerCase().indexOf("random video") != -1 ){
    random_video();
  }else if ( text.toLowerCase().indexOf("ascii art") != -1 ){
    get_ascii();   
  }else if ( text.toLowerCase().indexOf("cowsay") != -1 ){
    cow_say("cow",text);
  }else if ( text.toLowerCase().indexOf("tuxsay") != -1 ){
    cow_say("tux",text);
  }else if ( text.toLowerCase().indexOf("morse code") != -1 ){
    morse_code(from,text);
  }


});

function morse_code(from,text){
  var msg = text.split('"');
  var encoded = morse.encode(msg[1]);
  bot.say(config.channels[0], from + ", your message in Morse Code is: '" + encoded + "'");
  console.log(from + ", your message in Morse Code is: " + encoded);

}

function cow_say(cow,text){
    var msg = text.split('"');
    bot.say(config.channels[0], " ________");
    bot.say(config.channels[0], "<" + msg[1] + ">");
    var array = fs.readFileSync("cow_say/" + cow + ".ascii").toString().split("\n");
    for(i in array) {
      bot.say(config.channels[0], array[i]);
      console.log(array[i]);
    }

}

function shuffle_array(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//checks for key phrases and replies when one matchs
function check_msg(msg){
  var array = fs.readFileSync('talk.lst').toString().split("\n");
  array = shuffle_array(array);
  for(i in array) {
    var bot=array[i].split("|");
    var bot_read = bot[0].toLowerCase();
    var bot_write = bot[1];
    if (msg.toLowerCase().indexOf(bot_read) != -1 && bot_write){
      return bot_write;
    }    
  }
}

function random_hello(){
  var fs = require('fs');
  var array = fs.readFileSync('hello.lst').toString().split("\n");
  array = shuffle_array(array);
  return array[0];
}

function random_video(){
  var http = require('http');

  http.get("http://filmsbykris.com/site_data/video.lst").on('response', function (response) {
      var body = '';
      var i = 0;
      response.on('data', function (chunk) {
          body += chunk;
      });
      response.on('end', function () {
          var videos = body.split('\n');
          videos = shuffle_array(videos);
          var video = videos[0].split('|');
          var title = video[0];
          var url = "https://www.youtube.com/watch?v=" + video[1];
          bot.say(config.channels[0], title + " : " + url);
          console.log(title + " : " + url);
      });
  });
}

//display random video URL every hour
setInterval(random_video,60*60*1000);

//load random ascii file
function get_ascii(){
  var fs = require('fs');
  var art = [];
  var dir = "ascii/";
  fs.readdir(dir, function(err, files) {
    if (err) return;
    files.forEach(function(f) {
      art.push(f);
    });
    art = shuffle_array(art);
    console.log(art[0]);
    var array = fs.readFileSync(dir + art[0]).toString().split("\n");
    for(i in array) {
      var _this = this;
      var line = array[i];
      setTimeout(function(line){ 
        bot.say(config.channels[0], line);
        console.log(line);
      },i * 700,line);
    }
  });


}

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}
