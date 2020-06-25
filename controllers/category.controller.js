const Category = require('../models/category')
const Sequelize = require("sequelize");

module.exports = {
  getCategory: getCategory,
  putCategory: putCategory,
  deleteCategory: deleteCategory,
  postCategory: postCategory,
}

// Get Category
function getCategory(req, res) {
  Category.findAll({
      order: [
        ['name', 'ASC']
      ]
    })
    .then(category => {
      res.json(category)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Category
function putCategory(req, res) {
  if (!req.body.name) {
    res.send('Ingresar todos los campos')
  } else {
    Category.update({
        name: req.body.name,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          category_id: req.params.id
        }
      })
      .then(() => {
        res.send('Categoría actualizada')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Category
function deleteCategory(req, res) {
  Category.destroy({
      where: {
        category_id: req.params.id
      }
    })
    .then(() => {
      res.send('Categoría eliminada')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Category
function postCategory(req, res) {
  if (!req.body.name) {
    res.send('Ingresar todos los campos')
  } else {
    Category.create(req.body)
      .then(() => {
        res.send('Categoría registrada')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}