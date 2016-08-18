var databaseOptions = {
	host: '127.0.0.1',
	port: 3306,
	user: 'session_expressjs',
	password: 'password',
	database: 'session_expressjs'
};

var knex = require('knex')({
	client: 'mysql',
	connection: databaseOptions
});

var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
// bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 10;
// bcrypt



var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
 
var sessionStore = new MySQLStore(databaseOptions);
 
app.use(session({
	key: 'our-cookie',
	secret: 'secret!',
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {

	req.isAuthenticated = function() {
		return !!req.session.user;
	};

	next();
});

function requireAuthentication(req, res, next) {

	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}

	// The user is logged in.F
	// Allow heir request to continue.
	next();
}

app.engine('html', exphbs({
	extname: 'html',
	defaultLayout: 'main'
}));

app.set('view engine', 'html');

app.use(function(req, res, next) {
	console.log('URL requested', req.originalUrl);
	next();
});

app.get('/login', function(req, res) {

	// Show the login page.
	res.render('login');
});


app.get('/logout', function(req, res) {

	if (req.isAuthenticated()) {
		// Destroy their current session to be sure they are logged out.
		// This is important because the session might contain data related to their user account.
		req.session.destroy(function() {
			// Send them to the login page.
			res.redirect('/login');
		});
	} else {
		// They are already logged out.
		// Send them to the login page.
		res.redirect('/login');
	}
});

app.get('/registro', function(req, res) {

	// Show the registration page.
	res.render('registro');
});

app.post('/registro', function(req, res) {

	var myPlaintextPassword = req.body.password;
	var user = req.body.username;

	bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        var newRegistro = {
		password: hash,
		username: user,
		}


	knex('users').insert(newRegistro).then(function(result) {
		res.redirect('/login');
	}).catch(function(error) {
		console.log(error);
	});
    });
}); // bcrypt

	
});


app.post('/login', function(req, res) {


		// the following variables take the 
		// data username and password from the form
		var usernameReq = req.body.username;
		var passwordReq = req.body.password;
		// knex compares the information from the form
		// with the information in the user table
		// and login the user if it is right
		knex('users')
		.where({
  		username: usernameReq })
  		.select('password')
  		.then(function(result){
  			if (!result || !result[0]){ // not found
  				res.send('Wrong username!');

  			}
  			var hash = result[0].password;
  			if (bcrypt.compareSync(passwordReq, hash)){
  				// Correct username+password.
				// Generate a new session and store their user information in the session data.
				req.session.regenerate(function() {

				req.session.user = {
					username: usernameReq};
				res.redirect('/logged');
				})
			}else{
  				// Wrong username/password.
				res.send('Wrong username/password!');
  				}
  			}).catch(function(error) {
		console.log(error);
	}); // closing then(
		});

app.get('/logged', function(req, res) {

	// Show the registration page.
	res.render('logged');
});

app.listen(3000, 'localhost', function() {
	console.log('Example app listening on port 3000!');
});