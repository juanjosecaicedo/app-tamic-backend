const db = require('../database/db')

module.exports = {
  getRevenues: getRevenues,
  getEarnings: getEarnings,
  getCountUsers: getCountUsers,
  getActiveUsers: getActiveUsers,
  getInactiveUsers: getInactiveUsers,
  getNewUsers: getNewUsers,
  getRecurrentUsers: getRecurrentUsers,
  getGenderUsers: getGenderUsers,
  getCountCategories: getCountCategories,
  getTraffic : getTraffic,
  getCodes: getCodes,
  getPayments: getPayments,
}


function getPayments(req, res) {
  query = "SELECT * FROM view_payments"  
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Revenues
function getRevenues(req, res) {
  let query = "";  
  if (req.params.id != "all") {
    query = "SELECT * FROM view_revenues WHERE user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_revenues"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Earnings
function getEarnings(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_earnings WHERE user_id='" + req.session.user_id + "'";    
  } else {
    query = "SELECT * FROM view_earnings"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Count Users
function getCountUsers(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_count_users WHERE user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_count_users"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Active Users
function getActiveUsers(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_active_users WHERE user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_active_users"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Inactive Users
function getInactiveUsers(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_inactive_users WHERE user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_inactive_users"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get New Users
function getNewUsers(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_new_users WHERE tbl_users_user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_new_users"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Recurrent Users
function getRecurrentUsers(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_recurrent_users WHERE tbl_users_user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_recurrent_users"
  }
  db.sequelize.query(query, {     
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Gender Users
function getGenderUsers(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_gender_users WHERE tbl_users_user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_gender_users"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}


// Get Count Categories
function getCountCategories(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_count_categories WHERE tbl_users_user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_count_categories"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Traffic
function getTraffic(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_traffic WHERE tbl_users_user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_traffic"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

// Get Codes
function getCodes(req, res) {
  let query = "";
  if (req.params.id != "all") {
    query = "SELECT * FROM view_user_codes WHERE user_id='" + req.session.user_id + "'";
  } else {
    query = "SELECT * FROM view_user_codes"
  }
  db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(revenues => {
      res.json(revenues)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
