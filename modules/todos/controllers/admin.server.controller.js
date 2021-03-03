const { model } = require('mongoose');

const Todo = model('Todo');

/**
 * List all companies
 * @controller List
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.list = async function list(req, res, next) {
  let { $query } = req;
  const { query } = req;
  const { $top: top = 10, $skip: skip = 0 } = query;

  if (!$query) {
    $query = Todo.find({});
  }

  try {
    const result = await $query.paginate({ top, skip });
    return res.json(result);
  } catch (e) {
    return next(e);
  }
};
