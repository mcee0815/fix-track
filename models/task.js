const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    completed:{type:Boolean},
    title: {type: String,required:true}, // ex. bathroom sink
    details: {type: String,required:true}, // bathroom sink is leaking
    location: {type: String,required:true}, // 2a, 2b, front entrance etc.. or n/a
    reportedBy: {type: String,required:true}, // mike corporan cna
    maintainer: {type: String,}, // ex. fixed by german
    reportedAt: { type: Date, default: Date.now },
    completedOn: { type: Date,default: Date.now},
  }
);
//Export model
module.exports = mongoose.model('Task', taskSchema);