import React from 'react';

// Lets the user filter games by their playing status.
const GameFilter = ({ filter, setFilter }) => (
    <div className="game-filter">
        <label htmlFor="gameStatusFilter">Filter by status: </label>

        <select
            id="gameStatusFilter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
        >
            <option value="All">All Games</option>
            <option value="Want to Play">Want to Play</option>
            <option value="Playing">Playing</option>
            <option value="Completed">Completed</option>
        </select>
    </div>
);

export default GameFilter;
