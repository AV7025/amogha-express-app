const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const utils = require('./utils');

const create = () => {
    const app = express();

    // Serve favicon
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

    // Request logger
    app.use(utils.appLogger);

    // Middleware to handle form POST submissions
    app.use(express.urlencoded({ extended: true }));

    // --- Core API & Static Routes ---
    app.get('/api/hello', (req, res) => {
        res.json({ hello: 'goodbye' });
        res.end();
    });

    // Static homepage
    app.get('/', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/client.html'))
    );

    // --- Simulated User Routes for Load Testing ---

    app.get('/login', (req, res) => {
        res.send('<h3>Login Page - Simulated</h3>');
    });

    app.get('/dashboard', (req, res) => {
        res.send('<h3>User Dashboard - Simulated Data</h3>');
    });

    app.get('/search', (req, res) => {
        res.send('<h3>Search Results - Simulated</h3>');
    });

    app.get('/form', (req, res) => {
        res.send(`
            <form method="POST" action="/submit">
                <input name="name" placeholder="Enter Name" required />
                <button type="submit">Submit</button>
            </form>
        `);
    });

    app.post('/submit', (req, res) => {
        const name = req.body.name || 'Anonymous';
        res.send(`<h3>Form submitted by: ${name}</h3>`);
    });

    app.get('/logout', (req, res) => {
        res.send('<h3>User logged out</h3>');
    });

    // --- Error Handling ---
    app.use(utils.logErrors);
    app.use(utils.clientError404Handler);
    app.use(utils.clientError500Handler);
    app.use(utils.errorHandler);

    return app;
};

module.exports = {
    create
};
