//route controllers for authentication based routes
const express = require('express');
const authenticationRouter = express.Router();

authenticationRouter.signup = (req, res) => {
  res.render('signup');
};

authenticationRouter.signin = (req, res) => {
  res.render('signin');
};

authenticationRouter.playerhome = (req, res) => {
  res.render('playerhome', { user: req.user, isSponsor: req.user.accountType === 'sponsor', isPlayer: req.user.accountType === 'player' });
};

authenticationRouter.sponsorhome = (req, res) => {
  res.render('sponsorhome', { user: req.user, isSponsor: req.user.accountType === 'sponsor', isPlayer: req.user.accountType === 'player' });
};

authenticationRouter.createplayerprofile = (req, res) => {
  res.render('createplayerprofile', { user: req.user, isSponsor: req.user.accountType === 'sponsor', isPlayer: req.user.accountType === 'player' });
};

authenticationRouter.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
module.exports = authenticationRouter;