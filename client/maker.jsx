const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const AddGameForm = require('./components/AddGameForm.jsx').default;
const GameLibrary = require('./components/GameLibrary.jsx').default;
const GameFilter = require('./components/GameFilter.jsx').default;
const GameStats = require('./components/GameStats.jsx').default;

const App = () => {
    const [games, setGames] = useState([]);
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Retrieve the logged-in user's games from MongoDB.
    const loadGames = async () => {
        try {
            const response = await fetch('/getGames');

            if (!response.ok) {
                throw new Error('Could not load your games.');
            }

            const data = await response.json();
            setGames(data.games);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGames();
    }, []);

    // Send a new game to the server.
    const addGame = async (gameData) => {
        setError('');
        setMessage('');

        try {
            const response = await fetch('/addGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Could not add game.');
            }

            setMessage('Game added successfully!');
            await loadGames();

            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const filteredGames = filter === 'All'
        ? games
        : games.filter((game) => game.status === filter);

    return (
        <main className="gamevault-app">
            <h1>GameVault</h1>
            <p>Track your games, organize your collection, and monitor your progress.</p>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <AddGameForm onAddGame={addGame} />

            <GameStats games={games} />

            <section className="library-section">
                <h2>My Game Library</h2>

                <GameFilter filter={filter} setFilter={setFilter} />

                {loading ? (
                    <p>Loading your games...</p>
                ) : (
                    <GameLibrary games={filteredGames} />
                )}
            </section>
        </main>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;
