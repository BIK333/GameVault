import React from 'react';

// Displays the information for one saved game.
const GameCard = ({ game }) => (
    <div className="game-card">
        <h3>{game.title}</h3>
        <p>Platform: {game.platform}</p>
        <p>Status: {game.status}</p>
        <p>Rating: {game.rating}/10</p>
    </div>
);

export default GameCard;
