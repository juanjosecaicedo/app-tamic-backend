const Types = require('../models/types')

module.exports = {
  getType: getType,
  getByType: getByType
}

// Get Types
function getType(req, res) {
  Types.findAll({
      order: [
        ['name', 'ASC']
      ]
    })
    .then(types => {
      res.json(types)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get By Type
function getByType(req, res) {
  Types.findAll({
    where: {
      type_id: req.params.id
    }
    })
    .then(types => {
      res.json(types)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}