module.exports = (app, passport) => {

	// index routes
	app.get('/auth', (req, res) => {
		res.render('index-admin');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', isLoggedIn, (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup',isLoggedIn, passport.authenticate('local-signup', {
            successRedirect: '/admin',
            failureRedirect: '/signup',
            failureFlash: true // allow flash messages
        })
    );

	//admin view
	app.get('/admin', isLoggedIn, (req, res) => {
		res.render('admin', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
    console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
        console.log("auntenticando");
		return next();
	} else
    	res.redirect('/auth');
}