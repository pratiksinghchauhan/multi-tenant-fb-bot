const Botmaster = require('botmaster');
const MessengerBot = require('botmaster-messenger');
// var mongoose = require('mongoose');
const express = require('express');
var unirest = require('unirest');

var app = express();

// mongoose.connect(process.env.MONGO_URL);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error to  db:'));
// db.once('open', function () {
//     console.log('Connected correctly to mongo server');
// });


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

    // conversation = await conversationLogs.find({sender_id:update.sender.id,page_id:update.recipient.id}.sort([['ts', -1]]));
    // console.log(conversation);

    // if(!conversation){
    //   //show user the menu based on the page id
    // }

    // else if(conversation.currentFlow == "registration"){
    //   //pass the bot to registration flow with step number and save to database at the end of each flow
    // }
    // else if(conversation.currentFlow == ""){

    // }
    // else{
    //   //show user the choices
    // }
    
        console.log(update.recipient.id);
        if(update.recipient.id == "2204397273123993"){
          console.log(update)
          console.log(update.message)
            var original_question= update.message.text.replace("/","");
            console.log(update.message.text);
            unirest.get("http://45.76.57.36:7500/question/5adeeb4ec3d41e2598606ece/" + original_question).headers({
                'Content-type': 'application/json'
            }).end(function (res) {
                console.log(res.body); 
                if (res.error) {
                    console.log('GET error', res.error)
                    console.log('Go to begin Dialog Cont');
                    bot.reply(update, 'faq Server issue');
                    //bot.reply(update, 'Hello World');
                    return 3;
                }
                else if(res.body.response_list && res.body.response_list.length > 0){
                  console.log("Got responses from faq bot");
                  var answer2 = {};
                  var answer3 = {};
                  var answer1 = res.body.response_list[0];
                
                  if(res.body.response_list.length>1)answer2 = res.body.response_list[1];
                  if(res.body.response_list.length>2)answer3 = res.body.response_list[2];
                  console.log("confidenceeeeee-"+answer1.confidence);
                  if (answer1.confidence){//} > 0.5) {
                      var ans =  answer1.answer.replace(/\r?\n|\r/g, " ");
                      bot.reply(update, ans);
                      console.log(answer1);
                  }
              }
              else{
                  bot.reply(update, "FAQ NOT FOUND");
                }
            });
        }
          
    else if(update.recipient.id == "414633025706991"){
      console.log(update)
          console.log(update.message)
            var original_question= update.message.text.replace("/","");
            console.log(update.message.text);
            unirest.get("http://45.76.57.36:7500/question/5aae9c5d1d18d519a8e27bd2/" + original_question).headers({
                'Content-type': 'application/json'
            }).end(function (res) {
                console.log(res.body); 
                if (res.error) {
                    console.log('GET error', res.error)
                    console.log('Go to begin Dialog Cont');
                    bot.reply(update, 'faq Server issue');
                    //bot.reply(update, 'Hello World');
                    return 3;
                }
                else if(res.body.response_list && res.body.response_list.length > 0){
                  console.log("Got responses from faq bot");
                  var answer2 = {};
                  var answer3 = {};
                  var answer1 = res.body.response_list[0];
                
                  if(res.body.response_list.length>1)answer2 = res.body.response_list[1];
                  if(res.body.response_list.length>2)answer3 = res.body.response_list[2];
                  console.log("confidenceeeeee-"+answer1.confidence);
                  if (answer1.confidence){//} > 0.5) {
                      var ans =  answer1.answer.replace(/\r?\n|\r/g, " ");
                      bot.reply(update, ans);
                      console.log(answer1);
                  }
              }
              else{
                  bot.reply(update, "FAQ NOT FOUND");
                }
            });
    }
      // bot.reply(update,"hey there");
    else
      bot.reply("hey hey");
    
    return bot.sendMessage(messageToSend);
  }
});