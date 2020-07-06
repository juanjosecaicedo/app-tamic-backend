const Chapters = require('../models/chapter')
const Sequelize = require("sequelize");
const db = require('../database/db')

module.exports = {
  getChapters: getChapters,
  putChapters: putChapters,
  deleteChapters: deleteChapters,
  postChapters: postChapters,
  getByChapter: getByChapter,
  getEpisodes: getEpisodes,
  getByEpisodes: getByEpisodes
}

// Get Chapters
function getByChapter(req, res) {  
  db.sequelize.query("SELECT * FROM view_episodes WHERE tbl_streaming_streaming_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Chapters => {
      res.json(Chapters)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Chapters
function getChapters(req, res) {
  db.sequelize.query("SELECT * FROM view_chapters", {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Chapters => {
      res.json(Chapters)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Chapters
function getByEpisodes(req, res) {  
  db.sequelize.query("SELECT * FROM view_episodes WHERE tbl_streaming_streaming_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Chapters => {
      res.json(Chapters)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Episodes
function getEpisodes(req, res) {
  db.sequelize.query("SELECT * FROM view_episodes", {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(Chapters => {
      res.json(Chapters)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Chapters
function putChapters(req, res) {
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    Chapters.update({
        season: req.body.season,
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        img_chapter: req.body.img_chapter,
        url_chapter: req.body.url_chapter,
        tbl_streaming_streaming_id: req.body.tbl_streaming_streaming_id,
        state: req.body.state,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          chapter_id: req.params.id
        }
      })
      .then(() => {
        res.send('Episodio actualizado')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Chapters
function deleteChapters(req, res) {
  Chapters.destroy({
      where: {
        chapter_id: req.params.id
      }
    })
    .then(() => {
      res.send('Episodio eliminado')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Chapters
function postChapters(req, res) { 
  if (validateFields(req)) {
    res.send('Ingresar todos los campos');
  } else {
    Chapters.create(req.body)
      .then(() => {
        res.send("Episodio registrado")
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Validate fields
function validateFields(req) {
  if (!req.body.season ||
    !req.body.name ||
    !req.body.description ||
    !req.body.duration ||
    !req.body.img_chapter ||
    !req.body.state || 
    !req.body.tbl_streaming_streaming_id ||
    !req.body.url_chapter) {
    return true;
  } else {
    return false;
  }
}
