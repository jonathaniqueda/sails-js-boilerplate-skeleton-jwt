/**
 * Estados.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  tableName: 'Estados',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  autoPK: true,

  attributes: {
    id: {
      type: 'ObjectId',
      primaryKey: true,
    },
    sigla: {
      type: 'String',
      required: true
    },
    uf: {
      type: 'String',
      required: true
    },
    createdAt: {
      type: 'Date',
      required: true
    },
    updatedAt: {
      type: 'Date',
      required: true
    },

    // Add a reference to Ddds
    ddds: {
      collection: 'Ddds',
      via: 'estado'
    }
  }

};
