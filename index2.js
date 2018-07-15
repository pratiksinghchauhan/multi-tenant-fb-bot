const Botmaster = require('botmaster');
const MessengerBot = require('botmaster-messenger');
const express = require('express');
const http = require('http');

var app = express();
var server =app.listen(process.env.PORT || '6000',function(){
    console.log("listening on 6000");
});

const botmaster = new Botmaster({server});


const messengerSettings = {
  credentials: {
    verifyToken: 'thisisatestchatbot',
    pageToken: 'EAAe4QSBmQm8BAB2CRteewPCSSGVu7OYutaxXJrYWAcjEq3HLhHxs0koPldtLG8ZBcakZBOIIdeS13eQmtPPgBwRQ0j4lg1cF7ijxwzfr1Apx3812e3wOFwMZAVfzbbkAe37vMsXtYu1W83P4qt9ynIMueN4Esl1eJXs7biXuAZDZD',
    fbAppSecret: '2bdfc981bad6feefc85d9c5bd20766d1',
  },
  webhookEndpoint: 'webhook',
};

const messengerBot = new MessengerBot(messengerSettings);

botmaster.addBot(messengerBot);

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {
    return bot.reply(update, 'Hello world!');
  }
});

botmaster.on('server running', () => resolve(botmaster));
//botmaster.on('error', reject);


