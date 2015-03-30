var mongoose = require('mongoose'),
    debug = require('debug')('code-challenge:model');

var ExerciseSchema = new mongoose.Schema({
    question: {
        type: 'String',
        required: true
    },
    answer: {
        type: 'String',
        required: true
    },
    distractors: {
        type: ['String'],
        required: true
    }
});

ExerciseSchema.pre('save', function(next) {
    var self = this;


    for(var i = 0, length = self.distractors && self.distractors.length; i < length; i++) {
        debug('Save: current distractor: ' + self.distractors[i] + ' answer: ' + self.answer);

        if(self.distractors[i] === self.answer) {
            debug('distractor matches answer!');

            next(new Error('Distractor should not match answer'));
        }
    }

    next();
});

var Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;