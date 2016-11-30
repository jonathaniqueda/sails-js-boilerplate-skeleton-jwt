/**
 * EstadosController
 *
 * @description :: Server-side logic for managing estados
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getDdds: function(req, res) {

    if (req.method.toUpperCase() != 'GET') {
      return res.json(401, ResponseMessage.pattern('error', req.method.toUpperCase() + " not allowed. Try with POST.", null));
    }

    var param = req.validator('uf', false);

    if (!param) {
      return res.badRequest('Custom message');
    }

    var ufReq = req.param('uf');
    var dddsNumbers = {};

    Estados.findOne({
        sigla: ufReq
      })
      .populate('ddds')
      .exec(function(err, estado) {
        if (err || estado == null) {
          return res.send(ResponseMessage.pattern('error', 'The state was not been found', null));
        }

        var obj = {};
        obj[estado.sigla] = estado.ddds[0].numbers;

        return res.send(ResponseMessage.pattern('success', null, obj));
      });
  },

};
