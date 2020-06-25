const StreamingCategory = require('../models/streaming.category')
const Sequelize = require("sequelize");
const db = require('../database/db')

module.exports = {
  getStreamingCategory: getStreamingCategory,
  putStreamingCategory: putStreamingCategory,
  deleteStreamingCategory: deleteStreamingCategory,
  postStreamingCategory: postStreamingCategory,
}

// Get StreamingCategory
function getStreamingCategory(req, res) {
  db.sequelize.query("SELECT * FROM tbl_streaming_categories INNER JOIN tbl_categories ON tbl_categories.category_id = tbl_streaming_categories.tbl_categories_category_id WHERE tbl_streaming_streaming_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(StreamingCategory => {
      res.json(StreamingCategory)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update StreamingCategory
function putStreamingCategory(req, res) {
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    StreamingCategory.update({
        tbl_streaming_streaming_id: req.body.tbl_streaming_streaming_id,
        tbl_categories_category_id: req.body.tbl_categories_category_id,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          streaming_category_id: req.params.id
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

// Delete StreamingCategory
function deleteStreamingCategory(req, res) {
  db.sequelize.query("DELETE FROM tbl_streaming_categories WHERE tbl_streaming_streaming_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.DELETE
    })
    .then(() => {
      res.json("Categoría eliminada")
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add StreamingCategory
function postStreamingCategory(req, res) {
  if (validateFields(req)) {
    res.send('Ingresar todos los campos');
  } else {
    StreamingCategory.create(req.body)
      .then(() => {
        res.send('Categoría registrada')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Validate fields
function validateFields(req) {
  if (!req.body.tbl_streaming_streaming_id ||
    !req.body.tbl_categories_category_id) {
    return true;
  } else {
    return false;
  }
}