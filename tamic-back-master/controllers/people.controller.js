const People = require('../models/people')
const User = require('../models/user')
const uuidV1 = require('uuid/v1');
const db = require('../database/db')
const Sequelize = require("sequelize");
const sha256 = require('sha256')

module.exports = {
  postPeople: postPeople,
  getPeople: getPeople,
  blockPeople: blockPeople,
  activePeople: activePeople,
  putPeople: putPeople,
  getByPeople: getByPeople,
  validateEmail: validateEmail,
  getUserId: getUserId,
  updateKeyCode: updateKeyCode,
  keyCode: keyCode
}

// Add People
function postPeople(req, res) {
  req.body.email_footprint = sha256(req.body.email);
  req.body.password = sha256(req.body.password);
  req.body.user_id = uuidV1();
  req.body.tbl_users_user_id = req.body.user_id;
  req.body.state = true;
  // db.sequelize.query("call proc_create_profile(:name_user,:id_user)", {
  //   type: db.sequelize.QueryTypes.SELECT,
  //   replacements: {
  //     name_user: req.body.name,
  //     id_user: req.body.user_id
  //   }
  // });  
    
  if (validateFields(req)) {
    res.send('Ingresar toda la información')
  } else {
    User.create(req.body)
      .then(() => {
        res.send(req.body.user_id);
      })
      .catch(error => {
        res.send('error: ' + error)
      })
    People.create(req.body)
      .then(() => {
        // res.send(req.body.people_id)
      })
      .catch(error => {
        // res.send('Error ' + error)
        User.destroy({
          where: {
            user_id: req.body.user_id
          }
        })
      })
  }
}

// Get People
function getPeople(req, res) {
  db.sequelize.query("SELECT * FROM view_user_detail", {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(people => {
      res.json(people)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get People
function getByPeople(req, res) {
  db.sequelize.query("SELECT * FROM view_user_detail WHERE email_footprint = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(people => {
      res.json(people)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Block people
function blockPeople(req, res) {
  db.sequelize.query("UPDATE tbl_users SET state = false WHERE tbl_users.user_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      res.json("Cuenta inactivada")
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Active people
function activePeople(req, res) {
  db.sequelize.query("UPDATE tbl_users SET state = true WHERE tbl_users.user_id = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      res.json("Cuenta activada")
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Update People
function putPeople(req, res) {
  if (updateFields(req)) {
    res.json({
      data: 'Ingresar toda la información'
    })
  } else {
    if (req.body.password == "" || req.body.password == null) {
      User.update({
          email: req.body.email,
          email_footprint: sha256(req.body.email),
          tbl_roles_role_id: req.body.tbl_roles_role_id,
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        }, {
          where: {
            user_id: req.body.user_id
          }
        })
        .then(() => {
          // res.send('Persona actualizada')
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    } else {
      User.update({
          email: req.body.email,
          email_footprint: sha256(req.body.email),
          password: sha256(req.body.password),
          tbl_roles_role_id: req.body.tbl_roles_role_id,
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        }, {
          where: {
            user_id: req.body.user_id
          }
        })
        .then(() => {
          // res.send('Persona actualizada')
        })
        .catch(err => {
          res.send('error: ' + err)
        })
    }

    People.update({
        name: req.body.name,
        lastname: req.body.lastname,
        identification: req.body.identification,
        tbl_types_type_id: req.body.tbl_types_type_id,
        phone: req.body.phone,
        address: req.body.address,
        language: req.body.language,
        date_birth: req.body.date_birth,
        gender: req.body.gender,
        tbl_cities_city_id: req.body.tbl_cities_city_id,
        updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
      }, {
        where: {
          people_id: req.params.id
        }
      })
      .then(() => {
        res.send('Información actualizada')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
}

// Validate fields
function validateFields(req) {
  if (
    !req.body.name ||
    !req.body.lastname ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.password ||
    !req.body.gender ||
    !req.body.language ||
    !req.body.tbl_cities_city_id 
    ) {
    return true;
  } else {
    return false;
  }
}

// Validate fields
function updateFields(req) {
  if (
    !req.body.name ||
    !req.body.lastname ||
    !req.body.phone ||
    !req.body.email ||
    // !req.body.password ||
    !req.body.gender ||
    !req.body.language ||
    !req.body.tbl_cities_city_id 
    ) {
    return true;
  } else {
    return false;
  }
}

// Validate email
function validateEmail(req, res) {
  db.sequelize.query("SELECT fnt_validate_email(:email) AS validate", {
      replacements: {
        email: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(people => {
      res.json(people)
    })
    .catch(() => {
      res.send('err')
    })
}

// get Id
function getUserId(req, res) {
  db.sequelize.query("SELECT user_id, key_code FROM tbl_users WHERE email_footprint = :id", {
      replacements: {
        id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(people => {
      res.json(people)
    })
    .catch(() => {
      res.send('err')
    })
}


// Update Key code
function updateKeyCode(req, res) {
  db.sequelize.query("UPDATE tbl_users SET key_code = :key_code WHERE email_footprint = :email", {
      replacements: {
        key_code: req.body.key_code,
        email: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(people => {
      res.json(people)
    })
    .catch(() => {
      res.send('err')
    })
}

// Update Key code
function keyCode(req, res) {
  db.sequelize.query("UPDATE tbl_users SET key_code = :key_code WHERE user_id = :user_id", {
      replacements: {
        key_code: req.body.key_code,
        user_id: req.params.id
      },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(people => {
      res.json(people)
    })
    .catch(() => {
      res.send('err')
    })
}