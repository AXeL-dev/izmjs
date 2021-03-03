/**
 * Module dependencies.
 */
const { Schema, model } = require('mongoose');

const { timestamps } = require('@config/index').lib.mongoose;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps,
    collection: 'todos',
  },
);

module.exports = model('Todo', TodoSchema);
