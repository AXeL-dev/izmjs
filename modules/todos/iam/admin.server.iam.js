const ctrls = require('../controllers/admin.server.controller');

/**
 * @type { IAM.default }
 */
module.exports = {
  prefix: '/todos/admin',
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
          iam: 'modules:todos:admin:list',
          title: 'List all todos',
          parents: ['modules:todos', 'modules:todos:admin'],
          description: 'List and navigate through todos',
          middlewares: [ctrls.list],
        },
      },
    },
  ],
};
