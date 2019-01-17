const router = require('../controllers/controllers');

module.exports = app => {
  // Load index page
  app.get('/', router.index);

  app.get('/index', router.index);

  app.get('/about', router.about);

  app.get('/contact', router.contact);

  app.get('/tourni', router.tourni);

  app.get('/playerhome2', router.playerhome2);

  app.get('/tournihome', router.tourni);
 


  // Render 404 page for any unmatched routes
  // eslint-disable-next-line
  app.use((req, res, next) => {
    res.render(`404`, { error: `${req.path} not found` });
  });

  // Catches errors at runtime and passes them to 404 page to render
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    console.error(err);
    res.render(`404`, { error: err });
  });
};
