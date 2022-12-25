const mongoose = require('mongoose')

const majorSchema = mongoose.Schema({
    title: String,
    majorName: String,
    details: String,
  
    //Student ref

        student: [{
                  type:mongoose.Schema.Types.ObjectId,
                  ref: 'Student'
    }],

    //instructor ref

        instructor: [{
                    type:mongoose.Schema.Types.ObjectId,
                     ref: 'Instructor'
    }],

    //course ref

           course: [{
                     type:mongoose.Schema.Types.ObjectId,
                     ref: 'Course'
    }]
},{timestamp: true });

const Major = mongoose.model("Major", majorSchema);

module.exports = Major;


