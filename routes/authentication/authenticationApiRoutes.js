// Requiring our models and passport as we've configured it
const db = require(`../../models`);
const passport = require(`../../config/passport/passport`);
const isAuthenticated = require(`../../config/passport/isAuthenticated`);
const isPlayer = require('../../config/passport/isPlayer');
const isSponsor = require('../../config/passport/isSponsor');

module.exports = app => {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(`/api/signin`, passport.authenticate(`local`), (req, res) => {
    res.json({ user: req.user });
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post(`/api/signup`, (req, res) => {
    const { body } = req;

    db.User.create({
      accountType: body.accountType,
      firstName: body.firstName,
      lastName: body.lastName,
      companyName: body.companyName,
      email: body.email,
      password: body.password
    })
      .then(user => {
        return req.login(user, error => {
          if (error) {
            res.status(500).json(error);
            return;
          }
          res.status(201).json({ message: `OK`, data: user });
        });
      })
      .catch(function (err) {

        res.status(500).json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get(`/api/user_data`, isAuthenticated, (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        uuid: req.user.uuid,
        accountType: req.user.accountType,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        companyName: req.user.lastName,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      });

    }
  });

  app.post('/api/createplayerprofile', isAuthenticated, isPlayer, (req, res) => {
    console.log(req);
    const body = req.body;
    const uuid = req.user.uuid;

    console.log(`UserUuid: ${uuid},
      about: ${body.about},
      birthdate: ${body.birthdate},
      city: ${body.city},
      state: ${body.state},
      favoriteSport: ${body.favoriteSport},
      favoriteTeam: ${body.favoriteTeam},
      facebookURL: ${body.facebookURL}`);

    db.UserProfile.create({
      UserUuid: uuid,
      about: body.about,
      birthdate: body.birthdate,
      city: body.city,
      state: body.state,
      favoriteSport: body.favoriteSport,
      favoriteTeam: body.favoriteTeam,
      facebookURL: body.facebookURL
    })
      .then(() =>
        res.redirect('/playerhome')
      );
  });
};
