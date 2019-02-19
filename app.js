const express = require('express');
const app = express();
const { User } = require('./db')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const methodOverride = require('method-override');

// app.use('/public', express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.get('/', (req, res, next) => {
    res.redirect('/users')
});

app.get('/users',  (req, res, next) => {
    User.findAll()
      .then(( users ) => res.render('index', { users }))
      .catch(next)
});

app.get('/users/:id',  (req, res, next) => {
  Promise.all([
    User.findByPk(req.params.id),
    User.findAll()
    ])
    .then(([ userToChange, users ]) => res.render('index-update', { userToChange, users }))
    .catch(next)
});

app.post('/users', (req, res, next) => {
  if (req.body.id) {
    User.findOne({ where: { id: req.body.id } })
      .then((userToChange) => userToChange.update({ name: req.body.name }))
      .then(() => res.redirect(`/users`))
      .catch(next)
  } else {
    User.create({ name: req.body.name })
      .then(() => res.redirect(`/users`))
      .catch(next)
  }
})

app.put('/users/:id', (req, res, next) => {
  Promise.all([
    User.findAll(),
    User.findOne({ where: { id: req.params.id }})
  ])
    .then(([ user, userToChange ]) => res.render('index', { user, userToChange }))
    .then((user) => res.redirect(`/users/${user.id}`))
    .catch(next)
  })

app.delete('/users/:id', (req, res, next) => {
    User.destroy({
      where: {
        id: req.params.id
      }
  })
    .then(() => res.redirect('/users/'))
    .catch(next);
})

module.exports = app;

