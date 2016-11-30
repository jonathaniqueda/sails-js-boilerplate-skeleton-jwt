/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res) {

    if (req.method.toUpperCase() != 'POST') {
      return res.json(401, ResponseMessage.pattern('error', req.method.toUpperCase() + " not allowed. Try with POST.", null));
    }

    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.json(401, ResponseMessage.pattern('error', 'Email and password is required. Try again.', null));
    }

    Users.findOne({
      email: email
    }, function(err, user) {
      if (!user) {
        return res.json(401, ResponseMessage.pattern('error', 'Invalid e-mail', null));
      }

      Users.comparePassword(password, user, function(err, valid) {

        if (err) {
          return res.json(403, ResponseMessage.pattern('error', 'Err... An error ocurred. Try again!', null));
        }

        if (!valid) {
          return res.json(401, ResponseMessage.pattern('error', 'Invalid password', null));
        } else {
          res.json(ResponseMessage.pattern('success', null, {
            email: user.email,
            expiresInMinutes: sails.config.tokenExpiresTime,
            token: JwToken.issue({
              id: user.id
            })
          }));
        } //close else

      }); //close compare

    }); //close findOne

  }

};
