/* eslint-disable */
//middleware restricting routes based on account type sponsor
module.exports = (req, res, next) => {
    if (req.user.accountType !== 'sponsor') {
        debugger;
    } else {
        return next();
    }

    return res.redirect('/playerhome');
};
