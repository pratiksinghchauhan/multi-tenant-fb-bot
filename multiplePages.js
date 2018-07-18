const Botmaster = require('botmaster');
const MessengerBot = require('botmaster-messenger');
var mongoose = require('mongoose');
const express = require('express');

var app = express();

mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to  db:'));
db.once('open', function () {
    console.log('Connected correctly to mongo server');
});


var server =app.listen(process.env.PORT || '6000',function(){
    console.log("listening on 6000");
});

const botmaster = new Botmaster({server});

const messengerSettings = {
  credentials: {
    verifyToken: 'thisisatestchatbot',
    fbAppSecret: '2bdfc981bad6feefc85d9c5bd20766d1',
    pages: {
      '2204397273123993': {
        pageToken: 'EAAe4QSBmQm8BAKuMrEQciuGkUANUd3ZBDmZA4hfWlppI17baL5E0FC6vJCpwZBNQsYEwo2Qts2TtmdfsX22a6mUfhcaovVyrYcG8YPjjM6B2MSDPerRZB9FOQEhJoqQQgMw4KNcSTgoxqwanXsMPC4yN30QrQhjbufQO0n5uhQZDZD',
      },
      '414633025706991': {
        pageToken: 'EAAe4QSBmQm8BAB2CRteewPCSSGVu7OYutaxXJrYWAcjEq3HLhHxs0koPldtLG8ZBcakZBOIIdeS13eQmtPPgBwRQ0j4lg1cF7ijxwzfr1Apx3812e3wOFwMZAVfzbbkAe37vMsXtYu1W83P4qt9ynIMueN4Esl1eJXs7biXuAZDZD',
      },
    },
  },
  webhookEndpoint: 'webhook',
};

const messengerBot = new MessengerBot(messengerSettings);

botmaster.addBot(messengerBot);

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {

    conversation = await conversationLogs.find({sender_id:update.sender.id,page_id:update.recipient.id}.sort([['ts', -1]]));
    console.log(conversation);

    if(!conversation){
      //show user the menu based on the page id
    }

    else if(conversation.currentFlow == "registration"){
      //pass the bot to registration flow with step number and save to database at the end of each flow
    }
    else if(conversation.currentFlow == ""){

    }
    else{
      //show user the choices
    }
    
    console.log(update.recipient.id);
    if(update.recipient.id == "2204397273123993")
      bot.reply(update, 'Hello World');
    else if(update.recipient.id == "414633025706991")
      bot.reply(update,"hey there");
    else
      bot.reply("hey hey");
    
    return bot.sendMessage(messageToSend);
  }
});