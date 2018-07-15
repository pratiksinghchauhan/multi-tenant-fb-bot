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
    pageToken: 'EAAe4QSBmQm8BAKuMrEQciuGkUANUd3ZBDmZA4hfWlppI17baL5E0FC6vJCpwZBNQsYEwo2Qts2TtmdfsX22a6mUfhcaovVyrYcG8YPjjM6B2MSDPerRZB9FOQEhJoqQQgMw4KNcSTgoxqwanXsMPC4yN30QrQhjbufQO0n5uhQZDZD',
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


