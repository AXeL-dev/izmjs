const ctrls = require('../controllers/user.server.controller');


/**
 * @type { IAM.default }
 */
module.exports = {
  prefix: '/todos',
  params: [
    {
      name: 'todoId',
      middleware: ctrls.getById,
    },
  ],
  routes: [
    {
      path: '/',
      methods: {
        /**
         * @params
         * [{
         *   "key": "$top",
         *   "value": "10",
         *   "description": "Number of items to return"
         * }, {
         *   "key": "$skip",
         *   "value": "0",
         *   "description": "Number of items to skip"
         * }]
         */
        get: {
          iam: 'modules:todos:user:list',
          title: 'List current user todos',
          parents: ['modules:todos', 'modules:todos:user'],
          description: 'List and navigate through todos',
          middlewares: [ctrls.list],
        },
        /**
         * @body
         * {
         *   "title": "{{$randomJobTitle}}",
         *   "description": "{{$randomLoremText}}"
         * }
         *
         * @test
         * pm.test("Status code is 201", function () {
         *   pm.response.to.have.status(201);
         *   const { _id: id } = pm.response.json();
         *   pm.environment.set('todoId', id);
         * });
         */
        post: {
          iam: 'modules:todos:user:create',
          title: 'Create new todo',
          parents: ['modules:todos', 'modules:todos:user'],
          description: 'Create a new todo and persist it to the database',
          middlewares: [ctrls.create],
        },
      },
    },
    {
      path: '/:todoId',
      methods: {
        /**
         * @params
         * [{
         *   "key": "$select",
         *   "value": "title,description,created_by",
         *   "description": "Attributes to select. The field should be separated by ','."
         * }]
         */
        get: {
          iam: 'modules:todos:user:one:get',
          title: 'Retrieve a todo',
          parents: ['modules:todos', 'modules:todos:user'],
          description: 'Get an existing todo',
          middlewares: [ctrls.getOne],
        },
        delete: {
          iam: 'modules:todos:user:one:remove',
          title: 'Remove an existing todo',
          parents: ['modules:todos', 'modules:todos:user'],
          description: 'Remove an existing todo from the database',
          middlewares: [ctrls.removeOne],
        },
        /**
         * @body
         * {
         *   "title": "{{$randomJobTitle}}",
         *   "description": "{{$randomLoremText}}"
         * }
         */
        put: {
          iam: 'modules:todos:user:one:update',
          title: 'Update a todo',
          parents: ['modules:todos', 'modules:todos:user'],
          description: 'Update an existing todo',
          middlewares: [ctrls.updateOne],
        },
      },
    },
  ],
};
