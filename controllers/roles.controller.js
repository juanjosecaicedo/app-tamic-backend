const Roles = require('../models/roles')
const Sequelize = require("sequelize");

module.exports = {
  getRoles: getRoles,
  putRoles: putRoles,
  deleteRoles: deleteRoles,
  postRoles: postRoles
}

// Get Roles
function getRoles(req, res) {
  Roles.findAll({
      order: [
        ['name', 'ASC']
      ]
    })
    .then(roles => {
      res.json(roles)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Roles
function putRoles(req, res) {
  if (!req.body.name) {
    res.send('Ingresar todos los campos')
  } else {
    Roles.update({
        name: req.body.name,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          role_id: req.params.id
        }
      })
      .then(() => {
        res.send('Rol actualizado')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Roles
function deleteRoles(req, res) {
  Roles.destroy({
      where: {
        role_id: req.params.id
      }
    })
    .then(() => {
      res.send('Rol eliminado')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Roles
function postRoles(req, res) {
  if (!req.body.name) {
    res.send('Ingresar todos los campos')
  } else {
    Roles.create(req.body)
      .then(() => {
        res.send('Rol registrado')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}