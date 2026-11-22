import React, { useState } from 'react';

// Form for adding a new game to the user's collection.
const AddGameForm = ({ onAddGame }) => {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [status, setStatus] = useState('Want to Play');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const success = await onAddGame({
            title,
            platform,
            status,
            rating,
        });

        if (success) {
            setTitle('');
            setPlatform('');
            setStatus('Want to Play');
            setRating(0);
        }
    };

    return (
        <form className="add-game-form" onSubmit={handleSubmit}>
            <h2>Add a Game</h2>

            <label htmlFor="gameTitle">Game Title</label>
            <input
            id="gameTitle"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            />

            <label htmlFor="gamePlatform">Platform</label>
            <input
                id="gamePlatform"
                type="text"
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                required
            />

            <label htmlFor="gameStatus">Status</label>
            <select
                id="gameStatus"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
                <option value="Want to Play">Want to Play</option>
                <option value="Playing">Playing</option>
                <option value="Completed">Completed</option>
            </select>

            <label htmlFor="gameRating">Rating (0–10)</label>
            <input
                id="gameRating"
                type="number"
                min="0"
                max="10"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
            />

            <button type="submit">Add Game</button>
        </form>
    );
};

export default AddGameForm;
