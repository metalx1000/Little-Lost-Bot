
function check_msg(msg){
  var fs = require('fs');
  var array = fs.readFileSync('talk.lst').toString().split("\n");
  for(i in array) {
    var bot=array[i].split("|");
    var bot_read = bot[0].toLowerCase();
    var bot_write = bot[1];
    if (msg.toLowerCase().indexOf(bot_read) != -1 && bot_write){
      console.log(bot_write);
    }    
  }
}

check_msg("I think linux sucks");
