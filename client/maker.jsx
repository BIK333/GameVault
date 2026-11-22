const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

const DomoForm = ({ onDomoAdded }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById('domoName').value;
        const age = document.getElementById('domoAge').value;
        const level = document.getElementById('domoLevel').value;

        if (!name || age === '' || level === '') {
            helper.handleError('Name, age, and level are required!');
            return;
        }

        helper.sendPost('/maker', { name, age, level }, () => {
            document.getElementById('domoName').value = '';
            document.getElementById('domoAge').value = '';
            document.getElementById('domoLevel').value = '1';
            onDomoAdded();
        });
    };

    return (
        <form className="domoForm" onSubmit={handleSubmit}>
        <label htmlFor="domoName">Name: </label>
        <input id="domoName" type="text" />

        <label htmlFor="domoAge">Age: </label>
        <input id="domoAge" type="number" min="0" />

        <label htmlFor="domoLevel">Level: </label>
        <input id="domoLevel" type="number" min="1" defaultValue="1" />

        <input type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = ({ reload }) => {
    const [domos, setDomos] = useState([]);
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        try {
            const response = await fetch('/deleteDomo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
      
            const data = await response.json();
      
            if (!response.ok) {
                helper.handleError(data.error || 'Could not delete Domo!');
                return;
            }
      
            setDomos(domos.filter((domo) => domo._id !== id));
            helper.hideError();
        } catch (err) {
            helper.handleError('Could not delete Domo!');
        }
    };

    useEffect(() => {
        const loadDomos = async () => {
        try {
            const response = await fetch('/getDomos');
            if (!response.ok) {
                throw new Error('Could not load Domos');
            }

            const data = await response.json();
            setDomos(data.domos);
            setError('');
        } catch (err) {
            setError('Could not load Domos!');
        }
        };

    loadDomos();
    }, [reload]);

    if (error) {
        return <h3>{error}</h3>;
    }

    if (domos.length === 0) {
        return <h3>No Domos Yet!</h3>;
    }

    return (
    <div className="domoList">
        {domos.map((domo) => (
            <div className="domo" key={domo._id}>
                <h3>Name: {domo.name}</h3>
                <h3>Age: {domo.age}</h3>
                <h3>Level: {domo.level ?? 1}</h3>
          
                <button type="button" onClick={() => handleDelete(domo._id)}>
                    Delete Domo
                </button>
            </div>
        ))}
    </div>
    );
};

const App = () => {
    const [reload, setReload] = useState(0);

    return (
        <div>
        <DomoForm onDomoAdded={() => setReload((value) => value + 1)} />
        <DomoList reload={reload} />
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;