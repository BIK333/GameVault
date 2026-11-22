import React from 'react';

// Displays statistics about the user's game collection.
const GameStats = ({ games }) => {
    const total = games.length;
    const playing = games.filter((game) => game.status === 'Playing').length;
    const completed = games.filter((game) => game.status === 'Completed').length;
    const wantToPlay = games.filter((game) => game.status === 'Want to Play').length;

    return (
        <div className="game-stats">
            <h2>My Collection Stats</h2>
            <p>Total Games: {total}</p>
            <p>Currently Playing: {playing}</p>
            <p>Completed: {completed}</p>
            <p>Want to Play: {wantToPlay}</p>
        </div>
    );
};

export default GameStats;
