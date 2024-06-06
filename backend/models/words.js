const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wordsSchema = new Schema({
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    words: [
        {
            en: {
                type: String,
                required: false
            },
            pl: {
                type: String,
                required: false
            }
        }
    ]
});

module.exports = mongoose.model('words', wordsSchema);
