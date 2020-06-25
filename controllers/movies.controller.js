const Movies = require('../models/movie')
const Sequelize = require("sequelize");
const db = require('../database/db')
const uuidV1 = require('uuid/v1');

module.exports = {
  getMovies: getMovies,
  putMovies: putMovies,
  deleteMovies: deleteMovies,
  postMovies: postMovies,
  getSlider: getSlider,
}

// Get Movies
function getMovies(req, res) {
  db.sequelize.query("SELECT * FROM view_movies", {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Movies
function putMovies(req, res) {  
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    Movies.update({
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
        res.send('Película actualizada')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Movies
function deleteMovies(req, res) {
  Movies.destroy({
      where: {
        streaming_id: req.params.id
      }
    })
    .then(() => {
      res.send('Película eliminada')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Movies
function postMovies(req, res) {
  req.body.streaming_id = uuidV1();  
  if (validateFields(req)) {
    res.send('Ingresar todos los campos');
  } else {
    Movies.create(req.body)
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


// Get Movies
function getSlider(req, res) {
  db.sequelize.query("SELECT * FROM view_slider", {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(slider => {
      res.json(slider)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}