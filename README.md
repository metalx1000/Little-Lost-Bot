# Little-Lost-Bot
A simple NodeJS IRC bot

Little Lost Bot has a talk.lst file with phrases it looks for in the first column and responses in the second.
columns are divided by a pipe '|'
responses are shuffled so you can have more than one response for each phrase.

if you mention about 'ascii art' the bot will flood the channel with a random ascii image
example: "I would love to see some ascii art'

Little Lost Bot has bot 'cowsay' and 'tuxsay' functions.

example: tuxsay "FOSS is the way to go!"
output: 
 __________
<FOSS is the way to go!>
 ---------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/`\
    \___)=(___/


you can also ask little lost bot for a random FilmsByKris youtube video.
example: "anyone know of some random videos I could watch?"

You can encode and decode Morse Code
examples: 
morse decode ".... . .-.. .-.. --- ....... .-- --- .-. .-.. -.."
morse code "Hello World"
