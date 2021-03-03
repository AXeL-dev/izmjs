const { model, Types } = require('mongoose');

const Todo = model('Todo');

/**
 * List current user todos
 * @controller List
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.list = async function list(req, res, next) {
  let { $query } = req;
  const { query, user } = req;
  const { $top: top = 10, $skip: skip = 0 } = query;

  if (!$query) {
    $query = Todo.find({ created_by: user });
  }

  try {
    const result = await $query.paginate({ top, skip });
    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

/**
 * Create a new todo
 * @controller List
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.create = async function create(req, res, next) {
  let result;
  const { user, body } = req;
  const { title, description } = body;
  const todo = new Todo({
    title,
    description,
    created_by: user,
  });

  try {
    result = await todo.save({ new: true });
  } catch (e) {
    return next(e);
  }

  return res.status(201).json(result);
};

/**
 * Get a specific todo
 * @controller Get one
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.getOne = async function getOne(req, res) {
  const { todo } = req;
  return res.json(todo);
};

/**
 * Removed a specific todo
 * @controller Remove one
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.removeOne = async function removeOne(req, res, next) {
  const { todo } = req;

  try {
    await todo.remove();
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
};

/**
 * Update a specific todo
 * @controller Update one
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.updateOne = async function updateOne(req, res, next) {
  const { todo, body } = req;

  try {
    todo.set(body);
    const result = await todo.save({ new: true });
    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

/**
 * Get todo by ID
 * @controller GetById
 * @param {import('express').Request} req The request
 * @param {import('express').Response} res The response
 * @param {Function} next Go to the next middleware
 */
exports.getById = async function getById(req, res, next, id) {
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: req.t('INVALID_TODO_ID', {
        id,
      }),
    });
  }

  let todo;
  const { $select = '' } = req.query;

  try {
    todo = await Todo.findById(id).select(
      $select
        .split(',')
        .map((attr) => attr.trim())
        .filter(Boolean)
        .join(' '),
    );
  } catch (e) {
    return next(e);
  }

  if (!todo) {
    return res.status(404).send({
      message: req.t('TODO_NOT_FOUND', {
        id,
      }),
    });
  }

  req.todo = todo;
  return next();
};
