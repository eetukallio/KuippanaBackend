const   passport    = require('passport'),
        jwt         = require('jsonwebtoken'),
        crypto      = require('crypto'),
        secret      = require('../auth/jwt_secret_key');

function generateToken(user) {
    return jwt.sign(user, secret.secret, {
        expiresIn:36000 // in seconds
    });
}

function setUserInfo(request) {
    return {
        id: request.id,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        isEmployer: request.isEmployer
    };
}

// Login route
exports.login = function(req, res, next) {
    console.log(req.user);
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};

// Employer check
exports.employerCheck = function(isEmployer) {
    return function(req, res, next) {
        const user = req;

        db.query("SELECT * FROM user WHERE id = ?", user.id, function (err, foundUser) {
            if (err) {
                res.status(422).json({error: 'No user was found'});
                return next(err);
            }

            if (foundUser.isEmployer == isEmployer) {
                return next();
            }

            res.status(401).json({error: 'You are not authorized to view this content.'});
            return next('Unauthorized');
        })
    }
};