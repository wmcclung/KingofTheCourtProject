// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = (req, res, next) => {
  console.log(`REQ PATH`, req.path);
  if (req.user) {
    return next();
  }

  return res.redirect('/signin');

};
