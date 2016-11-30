/**
 * Ddds.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  connection: 'mongoDb',
  tableName: 'Ddds',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  autoPK: true,

  attributes: {
    id: {
      type: 'ObjectId',
      primaryKey: true,
    },
    numbers: {
      type: 'Array',
      required: true
    },
    estadosId: {
      type: 'ObjectId',
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

    // Add a reference to Estado,
    estado: {
      model: 'Estados',
      columnName: 'estadosId',
    }
  },

};
