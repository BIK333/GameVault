
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    platform: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['Want to Play', 'Playing', 'Completed'],
        default: 'Want to Play',
    },

    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account',
    },

    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;
