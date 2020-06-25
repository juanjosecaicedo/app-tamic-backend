const db = require('../database/db')
const Plan = require('../models/plan')
const Sequelize = require("sequelize");
const uuidV1 = require('uuid/v1');
const dotenv = require('dotenv').config();

var epayco = require("epayco-node")({
  apiKey: process.env.EPAYCO_API_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: "ES",
  test: false
});

module.exports = {
  getPlan: getPlan,
  putPlan: putPlan,
  deletePlan: deletePlan,
  postPlan: postPlan,
  getActivePlan: getActivePlan,
  getPlansActivesUser:getPlansActivesUser
}

// Get Plans
function getPlan(req, res) {
  Plan.findAll()
    .then(plan => {
      res.json(plan)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Plans
function getActivePlan(req, res) {
  Plan.findAll({
      where: {
        state: true,
        tbl_types_type_id: "843e6604-715c-404b-bc40-896162af514a" // Plan Integral
      }
    })
    .then(plan => {
      res.json(plan)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update Plan
function putPlan(req, res) {
  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    Plan.update({
        name: req.body.name,
        description: req.body.description,
        interval_type: req.body.interval_type,
        interval_count: req.body.interval_count,
        value: req.body.value,
        dispositives: req.body.dispositives,
        state: req.body.state,
        tbl_types_type_id: req.body.tbl_types_type_id,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          plan_id: req.params.id
        }
      })
      .then(() => {
        res.send('Plan actualizado')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Delete Plan
function deletePlan(req, res) {
  epayco.plans.delete(req.params.id)
    .then(function (plan) {
      console.log(plan);
    })
    .catch(function (err) {
      console.log("err: " + err);
    })

  Plan.destroy({
      where: {
        plan_id: req.params.id
      }
    })
    .then(() => {
      res.send('Plan eliminado')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Add Plan 
function postPlan(req, res) {
  req.body.plan_id = uuidV1()
  var plan_info = {
    id_plan: req.body.plan_id,
    name: req.body.name,
    description: req.body.description,
    amount: req.body.value,
    currency: "cop",
    interval: req.body.interval_type,
    interval_count: req.body.interval_count,
    trial_days: 0
  }

  epayco.plans.create(plan_info)
    .then(function (plan) {
      console.log(plan);
    })
    .catch(function (err) {
      console.log("err: " + err);
    })

  if (validateFields(req)) {
    res.send('Ingresar todos los campos')
  } else {
    Plan.create(req.body)
      .then(() => {
        res.send(req.body.plan_id)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

function getPlansActivesUser(req, res){
  db.sequelize.query("call proc_get_plans(:user_id)", {
    //SELECT * FROM view_code_record WHERE code = :id
      replacements: {
        user_id: req.session.user_id
      },
      // type: db.sequelize.QueryTypes.SELECT
    })
    .then(plans => {
      let arrayTemp = [];
      for (let index = 0; index < plans.length; index++) {
        arrayTemp.push(plans[index].tbl_plans_plan_id.toString());
      }

      res.json(arrayTemp);
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Validate fields
function validateFields(req) {
  console.log(req.body.state)
  if (
    !req.body.name ||
    !req.body.value ||
    !req.body.interval_type ||
    !req.body.interval_count ||
    !req.body.dispositives ||
    !req.body.tbl_types_type_id ||
    !req.body.description
  ) {
    return true;
  } else {
    return false;
  }
}