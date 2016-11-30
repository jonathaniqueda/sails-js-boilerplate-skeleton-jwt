/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {

      if (req.method.toUpperCase() != 'POST') {
        return res.json(401, ResponseMessage.pattern('error', req.method.toUpperCase() + " not allowed. Try with POST.", null));
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.json(401, ResponseMessage.pattern('error', "Password doesn't match!", null));
      }

      Users.create(req.body).exec(function(err, user) {

        if (err) {
          return res.json(err.status, ResponseMessage.modelErrorReturn(err, 'users'));
        }

        // If user created successfuly we return user and token as response
        if (user) {
          // NOTE: payload is { id: user.id}
          res.json(200, ResponseMessage.pattern('success', null, {
            email: user.email,
            password: user.password,
            token: JwToken.issue({
              id: user.id
            })
          }));
        } // close if

      }); // close create

    } // close action

};
