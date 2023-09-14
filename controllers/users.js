const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    // ejs version:
    // try {
    //     const { email, username, password } = req.body;
    //     const user = new User({ email, username });
    //     const registeredUser = await User.register(user, password);
    //     req.login(registeredUser, err => {
    //         if (err) return next(err);
    //         req.flash('success', `Welcome to FriendsShelves ${username}!`);
    //         res.redirect('/books');
    //     });
    // } catch (e) {
    //     req.flash('error', e.message);
    //     res.redirect('register');
    // };
    // React version:
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.send(username);
        });
    } catch (e) {
        res.send(e.message);
    };
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back ${username}!`);
    const redirectUrl = res.locals.returnTo || '/books';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}