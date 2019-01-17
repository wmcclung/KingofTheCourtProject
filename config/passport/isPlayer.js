/* eslint-disable */
//middleware for restricting routes based on account type player
module.exports = (req, res, next) => {

    if (req.user.accountType === 'player') {
        return next();
    }

    return res.redirect('/sponsorhome');
}; 