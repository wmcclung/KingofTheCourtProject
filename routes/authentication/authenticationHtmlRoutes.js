const authenticationRouter = require('../../controllers/authenticationcontrollers');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require(`../../config/passport/isAuthenticated`);
const isPlayer = require('../../config/passport/isPlayer');
const isSponsor = require('../../config/passport/isSponsor');

module.exports = app => {

  app.get(`/signin`, authenticationRouter.signin);

  app.get(`/signup`, authenticationRouter.signup);
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get(`/playerhome`, isAuthenticated, isPlayer, authenticationRouter.playerhome);

  app.get(`/sponsorhome`, isAuthenticated, isSponsor, authenticationRouter.sponsorhome);

  app.get(`/home`, isAuthenticated, isPlayer, authenticationRouter.playerhome);

  app.get('/createplayerprofile', isAuthenticated, isPlayer, authenticationRouter.createplayerprofile);

  app.get('/logout', authenticationRouter.logout);

  // app.get('/playerhome2', );

  // app.get('/tournihome', );
};
