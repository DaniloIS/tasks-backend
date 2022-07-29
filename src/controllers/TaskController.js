const connection = require('../database/connection');

module.exports = {
  async show(req, res) {
    const { id } = req.params;
    const task = await connection('tasks').where('id', id)

    return res.json(task)
  },

  async showTasksUser(req, res) {
    const { id } = req.params;
    const tasks = await connection('tasks').where('userId', id)

    return res.json(tasks)
  },

  async index(req, res) {
    const tasks = await connection('tasks')

    return res.json(tasks)
  },

  async create(req, res) {
    const { desc, estimateAt, userId } = req.body;
    
    const task = await connection('tasks').insert({
      desc,
      estimateAt,
      doneAt: null,
      userId
    })

    return res.json({ task })
  },

  async delete(req, res) {
    const { id } = req.params;

    const task = await connection('tasks').where('id', id).del()

    return res.json({ task })
  }
}