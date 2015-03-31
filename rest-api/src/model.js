var mongoose = require('mongoose'),
    debug = require('debug')('code-challenge:model');

var ExerciseSchema = new mongoose.Schema({
    question: {
        type: 'String',
        required: true,
        trim: true
    },
    answer: {
        type: 'String',
        required: true,
        trim: true
    },
    distractors: [{
        type: 'String',
        required: true,
        trim: true
    }]
});

ExerciseSchema.pre('save', function(next) {
    var self = this;

    self.distractors.sort();

    for(var i = 0, length = self.distractors && self.distractors.length; i < length; i++) {
        debug('Save: current distractor: ' + self.distractors[i] + ' answer: ' + self.answer);

        if(self.distractors[i] === self.answer) {
            debug('distractor matches answer!');

            next(new Error('Distractor should not match answer'));
        }

        if(self.distractors[i] === self.distractors[i+1]){
            next(new Error('Discractors list should not have duplicate values'));
        }
    }

    next();
});

var Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;