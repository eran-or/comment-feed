const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email:{
    type: String, 
    required: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
msg: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentsSchema);