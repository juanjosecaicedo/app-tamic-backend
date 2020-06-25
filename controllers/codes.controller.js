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
  db.sequelize.query("SELECT * FROM view_code_record WHERE code = :id", {    
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
