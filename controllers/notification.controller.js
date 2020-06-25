const db = require('../database/db')

module.exports = {
    listNotifications: listNotifications
}
// Get People
function listNotifications(req, res) {  
  if (req.body.message !== undefined) {
    db.sequelize.query("select * from tbl_notifications", {
        type: sequelizeConnect.sequelize.QueryTypes.SELECT,
        replacements: {
            email: req.body.message
        }
    }).then((response) => {
      res.json(response);
    }).catch((error) => {
      console.log(error);
    });
  }
}