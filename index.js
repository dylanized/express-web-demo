const express = require('express');
const ejs = require('ejs');

// instantiate express app
const app = express();

// if port env var, use it, else use default
const port = (process.env.PORT) || 3000;

// set template engine
app.set('view engine', 'ejs');

// mount static server middleware
app.use(express.static('public'));

// mount web root route
app.get('/', (req, res) => {
	// render index page
	res.render('index');
});

// mount dynamic page route
app.get('/:slug', (req, res, next) => {
	// if slug does not contain a dot, render that page
	if (!req.params.slug.includes('.')) res.render(req.params.slug);
	// else proceed
	else next();
});

// mount catchall error route
app.get('*', (req, res) => {
	res.sendStatus(401);
});


// launch app and display console msg
app.listen(port, () => console.log(`Express is running on port ${ port }`));
