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
    updateCodesInfluencers: updateCodesInfluencers,
    getLinkUser: getLinkUser,
    getType: getType,
    postLink: postLink,
    deleteLink: deleteLink,
    updateLink: updateLink,
    linkValidate: linkValidate,
    getUserId: getUserId,
    linkAssociated: linkAssociated,
    getLinkAssociated: getLinkAssociated
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
    User.findOne({
        where: {

        }
    }).then(user => {
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

function updateCodesInfluencers(req, res) {
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
        });
    }).catch(err => {
        res.json({
            msj: "Error: " + err,
            success: false
        });
        console.log(err);
    })
}

function getLinkUser(req, res) {
    db.sequelize.query("SELECT `l`.`link`, `l`.`link_id`, `l`.`tbl_plans_plan_id`, `l`.`tbl_users_user_id`, `p`.`name` AS plan_name, l.`created_at`, l.`updated_at` FROM `tbl_links` l, `tbl_plans` p WHERE `l`.`tbl_plans_plan_id` = `p`.`plan_id` AND l.tbl_users_user_id = :id", {
        replacements: {
            id: req.params.id
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    })
}

function getType(req, res) {
    console.log(req.params);
    db.sequelize.query("SELECT `tbl_types_type_id` FROM `tbl_plans` WHERE `plan_id` = :id", {
        replacements: {
            id: req.params.id
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    })
}

function postLink(req, res) {
    console.log(req.body);
    db.sequelize.query('SELECT link FROM tbl_links WHERE tbl_links.link = :link', {
        replacements: {
            link: req.body.link
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        if (result.length == 0) {
            db.sequelize.query("INSERT INTO tbl_links (link_id, link, tbl_users_user_id, tbl_plans_plan_id) VALUES (fnt_uuidv4(), :link, :tbl_users_user_id, :tbl_plans_plan_id)", {
                replacements: {
                    link: req.body.link,
                    tbl_users_user_id: req.body.idUser,
                    tbl_plans_plan_id: req.body.idPlan
                },
                type: db.sequelize.QueryTypes.INSERT
            }).then(() => {
                res.send('Enlace registrado');
            }).catch(err => {
                console.log(err);
            })
        } else {
            res.send('Este enlace ya existe');
        }
    }).catch(err => {
        console.log(err);
    })
}

function deleteLink(req, res) {
    console.log(req.params.id);
    db.sequelize.query("DELETE FROM tbl_links WHERE link_id = :id", {
        replacements: {
            id: req.params.id
        },
        type: db.sequelize.QueryTypes.DELETE
    }).then(() => {
        res.send('Enlace eliminado');
    }).catch(err => {
        console.log(err);
    })
}

function updateLink(req, res){
    console.log(req.params);
    console.log(req.body);
    db.sequelize.query('UPDATE tbl_links SET link = :link WHERE link_id = :id',{
        replacements: {
            id: req.params.id,
            link: req.body.link
        },
        type: db.sequelize.QueryTypes.UPDATE
    }).then(()=> {
        res.send("Enlace actualizado");
    }).catch(err => {
        console.log(err);
    })
}

function linkValidate(req, res) {
    db.sequelize.query('SELECT link_id ,link FROM tbl_links WHERE tbl_links.link = :link', {
        replacements: {
            link: req.params.link
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err)
    })
}
function getUserId(req , res){
    db.sequelize.query("SELECT tbl_users.user_id FROM tbl_users WHERE email = :email", {
        replacements: {
            email: req.params.email
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        res.send(result);
    }).catch(err => console.log(err))
}
function linkAssociated(req, res){
    db.sequelize.query("INSERT INTO tbl_link_associated (link_associated_id, tbl_links_link_id, tbl_users_user_id) VALUES (fnt_uuidv4(), :link_id, :user_id)",{
        replacements: {
            link_id: req.body.link_id,
            user_id: req.body.user_id
        },
        type: db.sequelize.QueryTypes.INSERT
    }).then(() => {
        res.send('Enlace asociado')
    }).catch(err => console.log(err));
}
function getLinkAssociated(req, res){
    db.sequelize.query("SELECT ls.link_associated_id, l.link_id, l.link, concat(p.name,' ', p.lastname) as name, pl.name AS plan_name, pl.value FROM tbl_link_associated ls, tbl_links l, tbl_users u, tbl_people p, tbl_plans pl WHERE ls.tbl_links_link_id = l.link_id AND ls.tbl_users_user_id = u.user_id AND u.user_id = p.tbl_users_user_id AND l.tbl_plans_plan_id = pl.plan_id AND l.tbl_users_user_id = :user_id", {
        replacements: {
            user_id: req.params.user_id
        },
        type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        res.send(result);
    }).catch(err => console.log(err));
}