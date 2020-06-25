const Series = require('../models/movie')
const Sequelize = require("sequelize");
const db = require('../database/db')
const uuidV1 = require('uuid/v1');

module.exports = {
  getSeries: getSeries,
  putSeries: putSeries,
  deleteSeries: deleteSeries,
  postSeries: postSeries,
  getBySerie: getBySerie
}

// Get Series
function getSeries(req, res) {
  db.sequelize.query("SELECT * FROM view_series", {      
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Series => {
      res.json(Series)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Series
function getBySerie(req, res) {
  db.sequelize.query("SELECT * FROM tbl_streamings WHERE streaming_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Series => {
      res.json(Series)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Series
function putSeries(req, res) {  
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    Series.update({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        duration: req.body.duration,
        popularity: req.body.popularity,
        img_streaming: req.body.img_streaming,
        img_banner: req.body.img_banner,
        url_trailer: req.body.url_trailer,
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
        res.send('Serie actualizada')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Series
function deleteSeries(req, res) {
  Series.destroy({
      where: {
        streaming_id: req.params.id
      }
    })
    .then(() => {
      res.send('Serie eliminada')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Series
function postSeries(req, res) {
  req.body.streaming_id = uuidV1();  
  if (validateFields(req)) {
    res.send('Ingresar todos los campos');
  } else {
    Series.create(req.body)
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
  if (!req.body.title ||
    !req.body.tbl_countries_country_id ||
    !req.body.duration ||
    !req.body.popularity ||
    !req.body.state ||
    !req.body.year ||
    !req.body.url_streaming ||
    !req.body.img_streaming ||
    !req.body.img_banner ||
    !req.body.description) {
    return true;
  } else {
    return false;
  }
}
