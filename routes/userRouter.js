const express = require('express')
const router = express.Router()

var auth = false
var users = [
  { name: 'Paulo', age: 30},
  { name: 'Maria', age: 35},
  { name: 'Danielle', age: 25},
  { name: 'Bárbara', age: 28}
]


router.get('/add', (req, res) => {
  auth = true

  res.render('userform', { auth, users })
})


router.post('/save', (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const user = { name: name, age: age}
  users.push(user)
  auth = true
  res.render('viewuser', { auth, users })

})



const usuario = {
  login: 'usuario',
  senha: 123
}


router.post('/login', (req, res) => {
  const login = req.body.login
  const senha = req.body.senha
  let message = ""
  if (login == usuario.login && senha == usuario.senha) {
    auth = true
    message = "Usuário logado com sucesso!"

    res.render('home', { usuario: usuario, auth, message })
  }
  else {
    auth = false
    message = "Usuário e/ou senha inválidos!"
    res.render('login', { auth, message })

  }
})


router.get('/logout', (req, res) => {
  auth = false
  res.render('login', { auth })

})


router.get('/home', (req, res) => {

  res.render('home', { auth })
})


router.use(function (req, res) {
  res.status(404).render('404')
})


module.exports = router