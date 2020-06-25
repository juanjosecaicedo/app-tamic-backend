const Codes = require('../models/code')
const User = require('../models/user')
const Sequelize = require("sequelize");
const db = require('../database/db')

module.exports = {
    getCodes: getCodes,
    getByCodes: getByCodes,
    postCodes: postCodes,
    generatedLink: generatedLink,
    getCodesBusiness: getCodesBusiness,
    getCodesInfluencers: getCodesInfluencers,
    getUsersBussiness: getUsersBussiness,
    updateCodesInfluencers: updateCodesInfluencers
}

// Get Codes
function getCodes(req, res) {
    Codes.findAll()
        .then(Codes => {
            res.json(Codes);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

//Get users bussiness
function getUsersBussiness(req, res) {

    db.sequelize.query("SELECT * from users_bussines;", {
        type: db.sequelize.QueryTypes.SELECT
    })
        .then((users_bussines) => {
            res.json(users_bussines)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

// Get Codes
function getCodesInfluencers(req, res) {
    db.sequelize.query("SELECT * FROM view_all_codes WHERE tbl_types_type_id = '6a32aa24-141e-4662-b99b-b959d18bebaf' and tbl_types_type_id = '6a32aa24-141e-4662-b99b-b959d18bebaf';", {
        type: db.sequelize.QueryTypes.SELECT
    })
        .then((link) => {
            res.json(link)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

// Get Codes Business
function getCodesBusiness(req, res) {
    // db.sequelize.query("CALL proc_codes_bussines(:user_id, now());", {
    db.sequelize.query("CALL proc_codes_bussines(:user_id);", {
        //SELECT u.* from view_codes_business u where u.year = year(now());
        replacements: {
            user_id: req.session.tbl_roles_role_id === 'db2b9bdb-79c5-48d4-901c-09882a4db6eb' ? null : req.session.user_id
        }
    })
        .then((link) => {
            res.json(link)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}
// Generated link
function generatedLink(req, res) {
    db.sequelize.query("select fnt_generate_code() link;", {
        type: db.sequelize.QueryTypes.SELECT
    })
        .then((link) => {
            res.json(link)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

// Get By Codes
function getByCodes(req, res) {
    User.findOne({where:{
        
    }}).then(user => {
        Codes.findAll({
            where: {
                tbl_users_user_id: req.body.id
            }
        })
            .then(Codes => {
                res.json(Codes);
            })
            .catch(error => {
                res.send('error: ' + error)
            })
    }).catch(error => {
        res.send('error: ' + error)
    });

}

// Get Types
function postCodes(req, res) {
    console.log('params', req.body);
    //INSERT INTO tbl_codes(code_id, code, state, consecutive, commission, discount, expiration_date, tbl_plans_plan_id, tbl_users_user_id, tbl_types_type_id) VALUES (fnt_uuidv4(), :code, if(:state is null, 0, :state), fnt_consecutive_code(), :commission, :discount, :expiration_date, :idPlan, :idUser, :idType);
    db.sequelize.query("CALL proc_associate_codes(:quantity, :code, :state, :commission, :discount, :expiration_date, :idPlan, :idType, :idUser)", {
        replacements: {
            quantity: req.body.quantity,
            code: req.body.code || null,
            state: req.body.state,
            commission: req.body.quantityCommission,
            discount: req.body.quantityDiscount,
            expiration_date: req.body.expirationDate || null,
            idPlan: req.body.idPlan || null,
            idType: req.body.idType,
            idUser: req.body.idUser
        }
    })
        .then((response) => {
            res.json(response)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

function updateCodesInfluencers(req, res){
    console.log(req.params)
    console.log(req.body);
    Codes.update({
        state: req.body.state,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
            code_id: req.params.id
        }
      }).then(() => {
        res.json({
            msj: 'Codigo actualizado',
            success: true
        }
        );
    }).catch(err=>{
        res.json({
            msj: "Error: "+err,
            success: false
        });
        console.log(err);
    })
}