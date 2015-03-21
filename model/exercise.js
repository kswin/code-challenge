var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
  	question: String,
	answer: String,
	distractors: [String]
});

module.exports = mongoose.model('Exercise', ExerciseSchema);