const db = require('../database/db')

module.exports = {
    getInfluencers: getInfluencers,
    getPlansInfluencers: getPlansInfluencers,
    createService: createService,
    createServicePlan:createServicePlan
}

// Get influencers
function getInfluencers(req, res) {
    db.sequelize.query("SELECT user_id as value, full_name as text FROM view_plans_influencer GROUP BY 1;", {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(influencers => {
            res.json(influencers)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

// Get plans influencers
function getPlansInfluencers(req, res) {
    db.sequelize.query(" SELECT name as text, concat(plan_id,':',code_id,':',value) as value FROM view_plans_influencer WHERE user_id = :user_id;", {
            replacements: {
                user_id: req.body.user_id
            },
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(plans => {
            res.json(plans)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

function createService(req, res) {
    db.sequelize.query("CALL proc_create_services(:user_parent, :user_name, :user_lastname, :user_email, :password, :key_code, :phone, :gender, :document_type, :identification, :address, :city_id, :city_name, :plan_id, :code_id, :plan_value)", {
            replacements: {
                user_parent: req.session.email_footprint,
                user_name: req.body.user_name,
                user_lastname: req.body.user_lastname,
                user_email: req.body.user_email,
                password: req.body.password,
                key_code: req.body.key_code,
                phone: req.body.phone,
                gender: req.body.gender,
                document_type: req.body.document_type,
                identification: req.body.identification,
                address: req.body.address,
                city_id: req.body.city_id,
                city_name: req.body.city_name,
                plan_id: req.body.plan_id,
                code_id: req.body.code_id,
                plan_value: req.body.plan_value
            }
        })
        .then(plans => {
            res.json(plans)
        })
        .catch(err => {
            res.send('error: ' + err)
        })


}

function createServicePlan(req, res) {
    db.sequelize.query("CALL proc_add_service_existing_account(:email, :plan_id, :plan_value, :code)", {
            replacements: {
                //user_parent: req.session.email_footprint,
                email: req.body.email || null,
                plan_value: req.body.plan_value || null,
                plan_id: req.body.plan_id || null,
                code: req.body.code || null
            }
        })
        .then(plans => {
            res.json(plans)
        })
        .catch(err => {
            res.send('error: ' + err)
        })


}