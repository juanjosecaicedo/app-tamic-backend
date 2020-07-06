const PlanCategory = require('../models/plan.category')
const Sequelize = require("sequelize");
const db = require('../database/db')

module.exports = {
  getPlanCategory: getPlanCategory,
  putPlanCategory: putPlanCategory,
  deletePlanCategory: deletePlanCategory,
  postPlanCategory: postPlanCategory,
}

// Get PlanCategory
function getPlanCategory(req, res) {
  console.log(req.params.id);
  db.sequelize.query("SELECT * FROM tbl_plans_categories INNER JOIN tbl_categories ON tbl_categories.category_id = tbl_plans_categories.tbl_categories_category_id WHERE tbl_plans_plan_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(PlanCategory => {
      console.log(PlanCategory);
      res.json(PlanCategory)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update PlanCategory
function putPlanCategory(req, res) {
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    PlanCategory.update({
        tbl_plans_plan_id: req.body.tbl_plans_plan_id,
        tbl_categories_category_id: req.body.tbl_categories_category_id,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          plan_category_id: req.params.id
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

// Delete PlanCategory
function deletePlanCategory(req, res) {
  db.sequelize.query("DELETE FROM tbl_plans_categories WHERE tbl_plans_plan_id = :id", {
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

// Add PlanCategory
function postPlanCategory(req, res) {  
  if (validateFields(req)) {
    res.send('Ingresar todos los campos');
  } else {
    PlanCategory.create(req.body)
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
  if (!req.body.tbl_plans_plan_id ||
    !req.body.tbl_categories_category_id) {
    return true;
  } else {
    return false;
  }
}
