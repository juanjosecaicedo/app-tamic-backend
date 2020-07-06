const City = require('../models/city')

module.exports = {
  getCity: getCity,
  getByCity: getByCity
}

// Get Cities
function getCity(req, res) {
  City.findAll({
      order: [
        ['name', 'DESC']
      ]
    })
    .then(city => {
      res.json(city)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get By Cities
function getByCity(req, res) {
  City.findAll({
      order: [
        ['name', 'DESC']
      ],
      where: {
        tbl_countries_country_id: req.params.id
      }
    })
    .then(city => {
      res.json(city)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}