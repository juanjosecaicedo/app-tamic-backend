const db = require('../database/db')

module.exports = {
  getByCode: getByCode,
  getValidateCode: getValidateCode
}

// Get By Codes
function getByCode(req, res) {  
  db.sequelize.query("call proc_codes_target_influencer(:id, :email, :email_footprint)", {
    //SELECT * FROM view_code_record WHERE code = :id
      replacements: {
        id: req.params.id,
        email: req.query.email || null,
        email_footprint: req.session.email_footprint || null
      },
      // type: db.sequelize.QueryTypes.SELECT
    })
    .then(codes => {
      res.json(codes)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get By Codes
function getValidateCode(req, res) {  
  console.log(req.params);
  // db.sequelize.query("SELECT * FROM view_code_record WHERE code = :id", {    
  db.sequelize.query("SELECT c.code AS code,c.code_id AS code_id,c.discount AS discount,t.short_name AS short_name,p.plan_id AS plan_id,p.name AS plan_name,p.value AS plan_value FROM (((tbl_codes c join tbl_plans p on((p.plan_id = c.tbl_plans_plan_id))) join tbl_types t on((t.type_id = c.tbl_types_type_id))) join tbl_users u on((u.user_id = c.tbl_users_user_id))) WHERE (c.state = 1) AND code = :id", {
      replacements: {
        id: req.params.id,        
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(codes => {
      res.json(codes)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
