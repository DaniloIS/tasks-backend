const express = require('express')

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/auth', UserController.auth);

routes.get('/tasks/:id', TaskController.show);
routes.get('/tasks/user/:id', TaskController.showTasksUser);
routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.create);
routes.delete('/tasks/:id', TaskController.delete);

module.exports = routes;