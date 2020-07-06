const db = require('../database/db')

module.exports = {
    setLogger: setLogger
}

// Get Codes
function setLogger(req, res) {
    db.sequelize.query("insert into tbl_logs(log_id,type_function,data_json,created_at) values (fnt_uuidv4(), :type_function, :data_json, current_timestamp());", {
        type: db.sequelize.QueryTypes.INSERT,
        replacements: {
            type_function: req.body.type_function,
            data_json: req.body.data_json
        }
    }).then((logger) => {
        res.json(logger)
    }).catch(err => {
        res.send('error: ' + err)
    });
}