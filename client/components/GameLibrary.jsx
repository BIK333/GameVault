import React from 'react';
import GameCard from './GameCard.jsx';

// Displays the user's collection of games.
const GameLibrary = ({ games }) => {
    if (games.length === 0) {
        return <p>You haven't added any games yet.</p>;
    }

    return (
        <div className="game-library">
        {games.map((game) => (
            <GameCard key={game._id} game={game} />
        ))}
        </div>
    );
};

export default GameLibrary;
