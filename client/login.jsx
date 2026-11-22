const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

const handleLogin = (e) => {
    e.preventDefault();

    const username = document.querySelector('#user').value;
    const pass = document.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('All fields are required!');
        return;
    }

    helper.sendPost('/login', { username, pass });
};

const LoginWindow = () => (
    <form id="loginForm" onSubmit={handleLogin} className="mainForm">
        <label htmlFor="user">Username:</label>
        <input id="user" type="text" name="username" />

        <label htmlFor="pass">Password:</label>
        <input id="pass" type="password" name="pass" />

        <input type="submit" value="Login" className="formSubmit" />
    </form>
);

const handleSignup = (e) => {
    e.preventDefault();
  
    const username = document.querySelector('#user').value;
    const pass = document.querySelector('#pass').value;
    const pass2 = document.querySelector('#pass2').value;
  
    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return;
    }
  
    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return;
    }
  
    helper.sendPost('/signup', { username, pass, pass2 });
};
  
const SignupWindow = () => (
    <form id="signupForm" onSubmit={handleSignup} className="mainForm">
        <label htmlFor="user">Username:</label>
        <input id="user" type="text" name="username" />
  
        <label htmlFor="pass">Password:</label>
        <input id="pass" type="password" name="pass" />
  
        <label htmlFor="pass2">Confirm Password:</label>
        <input id="pass2" type="password" name="pass2" />
  
        <input type="submit" value="Sign Up" className="formSubmit" />
    </form>
);

const init = () => {
    const root = createRoot(document.getElementById('content'));
  
    document.getElementById('loginButton').addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
    });
  
    document.getElementById('signupButton').addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
    });
  
    root.render(<LoginWindow />);
};
  
window.onload = init;