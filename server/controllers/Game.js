
const models = require('../models');

const { Game } = models;

// Save a new game to the logged-in user's library.
const addGame = async (req, res) => {
    const { title, platform, status, rating } = req.body;

    if (!req.session.account) {
        return res.status(401).json({
        error: 'You must be logged in.',
        });
    }

    if (!title || !platform) {
        return res.status(400).json({
        error: 'Title and platform are required.',
        });
    }

    try {
        const newGame = await Game.create({
        title,
        platform,
        status: status || 'Want to Play',
        rating: rating === undefined || rating === '' ? 0 : Number(rating),
        owner: req.session.account._id,
        });

        return res.status(201).json({
        message: 'Game added successfully.',
        game: newGame,
        });
    } catch (err) {
        console.error('Error adding game:', err);

        if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Invalid game information.',
        });
        }

        return res.status(500).json({
        error: 'Unable to add game.',
        });
    }
};

// Retrieve only the games owned by the logged-in user.
const getGames = async (req, res) => {
    if (!req.session.account) {
        return res.status(401).json({
        error: 'You must be logged in.',
        });
    }

    try {
        const games = await Game.find({
        owner: req.session.account._id,
        }).sort({ dateAdded: -1 });

        return res.status(200).json({
        games,
        });
    } catch (err) {
        console.error('Error retrieving games:', err);

        return res.status(500).json({
        error: 'Unable to retrieve games.',
        });
    }
};

module.exports = {
    addGame,
    getGames,
};
