const Country = require('../models/country')

module.exports = {
  getCountry: getCountry,
}

// Get Countries
function getCountry(req, res) {
  Country.findAll({
      order: [
        ['name', 'DESC']
      ]
    })
    .then(country => {
      res.json(country);
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}