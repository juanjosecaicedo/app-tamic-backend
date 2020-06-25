const db = require('../database/db');

module.exports = {
  postLogin: postLogin,
  deleteSession: deleteSession,
  createSession: createSession
}

function postLogin(req, res) {
  if (req.body.email !== undefined || req.query.email !== undefined || req.body.password !== undefined || req.query.password !== undefined) {
    db.sequelize.query("call proc_login(:email,:password)", {
      replacements: {
        email: req.body.email || req.query.email || null,
        password: req.body.password || req.query.password || null
      }
    }).then((response) => {

      let objUser = response[0],
        plans = [];

      for (const i in response) {
        if (response[i].state == 1) {
          plans.push(response[i].tbl_plans_plan_id);
        }
      }

      if (plans != null) {
        objUser.plans = plans;
      }

      if (objUser.control != null) {
        objUser.control = true;
      } else {
        objUser.control = false;
      }

      //CREA LA SESSION
      // if(req.session.email_footprint !== undefined){
      //   req.session.destroy();  
      // }

      req.session.user_id = objUser.user_id;
      req.session.email_footprint = objUser.email_footprint;
      req.session.tbl_roles_role_id = objUser.tbl_roles_role_id;
      req.session.tbl_countries_country_id = objUser.tbl_countries_country_id;
      req.session.full_name = `${objUser.name} ${objUser.lastname}`;
      req.session.status_service = objUser.activeServices;
      req.session.email = objUser.email;
      req.session.ip = req.connection.remoteAddress.replace('::ffff:', '');
      req.session.online = 1;
      req.session.watch = 0;
      req.session.save();
      res.json(objUser);
    }).catch((error) => {
      console.log(error);
    });
  }
}

function createSession(req, res) {
  if (req.session.user_id == null || req.session.user_id == undefined) {
    req.session.user_id = req.body.user_id;
    req.session.email_footprint = req.body.email_footprint;
    req.session.tbl_roles_role_id = req.body.tbl_roles_role_id;
    req.session.tbl_countries_country_id = req.body.tbl_countries_country_id;
    req.session.full_name = `${req.body.name} ${req.body.lastname}`;
    req.session.status_service = req.body.activeServices;
    req.session.email = req.body.email;
    req.session.ip = req.connection.remoteAddress.replace('::ffff:', '');
    req.session.online = 1;
    req.session.watch = 0;
    req.session.save();
    res.send("Ok");
  } else {
    res.send("Fail");
  }
}

function deleteSession(req, res) {
  req.session.destroy();
  res.json({
    status: 200
  });
}