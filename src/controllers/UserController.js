const connection = require('../database/connection')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
require('dotenv').config();

const obterHash = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
  })
};

module.exports = {
  async index(req, res) {
    const users = await connection('users')

    return res.json(users)
  },

  async create(req, res) {
    const { name, email, password } = req.body;
    await obterHash(password, async hash => { const secretPassword = hash 

      const user = await connection('users').insert({
        name,
        email,
        password: secretPassword
      })

      return res.json({ user })
    })
  },

  async auth(req, res) {
    const { email, password} = req.body;

    if (!email || !password) {
      return res.status(400).send('Dados incompletos')
    }

    const user = await connection('users')
        .whereRaw("LOWER(email) = LOWER(?)", email)
        .first()

    if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).send('A senha informada é inválida!')
            }

            const payload = {
              id: user.id,
              name: user.name,
              email: user.email
            }

            res.json({
              id: user.id,
              name: user.name,
              email: user.email,
              token: jwt.encode(payload, process.env.AUTHSECRET),
            })
        })
    } else {
        res.status(400).send('Usuário não cadastrado!')
    }
  }
}