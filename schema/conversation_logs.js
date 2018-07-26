const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const ConversationLogModel = new Schema(
    {
        sender_id: {type: String, required: true, unique: false},
        page_id: {type: String, required: true, unique: false},
        step_number: {type: String, required: true, unique: false},
        flow: {type: String, required: true, unique: false},
        message: {type: String, required: true, unique: false},
        ts : { type : Date, default: Date.now }        
    }
);
module.exports = Mongoose.model('conversation_logs', ConversationLogModel);