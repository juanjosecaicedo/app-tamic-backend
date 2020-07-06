const Channels = require('../models/movie')
const Sequelize = require("sequelize");
const db = require('../database/db')
const uuidV1 = require('uuid/v1');

module.exports = {
  getChannels: getChannels,
  putChannels: putChannels,
  deleteChannels: deleteChannels,
  postChannels: postChannels,
}

// Get Channels
function getChannels(req, res) {
  db.sequelize.query("SELECT * FROM view_channels", {      
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Channels => {
      res.json(Channels)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Channels
function putChannels(req, res) { 
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    Channels.update({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        duration: req.body.duration,
        popularity: req.body.popularity,
        img_streaming: req.body.img_streaming,
        img_banner: req.body.img_banner,      
        url_streaming: req.body.url_streaming,
        state: req.body.state,
        tbl_types_type_id: req.body.tbl_types_type_id,
        tbl_countries_country_id: req.body.tbl_countries_country_id,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          streaming_id: req.params.id
        }
      })
      .then(() => {
        res.send('Canal actualizado')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Channels
function deleteChannels(req, res) {
  Channels.destroy({
      where: {
        streaming_id: req.params.id
      }
    })
    .then(() => {
      res.send('Canal eliminado')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Channels
function postChannels(req, res) {
  req.body.streaming_id = uuidV1();  
  if (validateFields(req)) {
    res.send('Ingresar todos los campos');
  } else {
    Channels.create(req.body)
      .then(() => {
        res.send(req.body.streaming_id)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Validate fields 
function validateFields(req) {
  if (
    !req.body.title ||
    !req.body.tbl_countries_country_id ||
    !req.body.duration ||
    !req.body.popularity ||
    !req.body.state ||
    !req.body.year ||
    !req.body.url_streaming ||
    !req.body.img_streaming ||
    !req.body.img_banner ||
    !req.body.description
    ) {
    return true;
  } else {
    return false;
  }
}
