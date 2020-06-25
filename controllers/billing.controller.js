const db = require('../database/db');
var request = require('request');
const Payment = require('../models/epayco.payment')
const dotenv = require('dotenv').config();

var epayco = require("epayco-node")({
  apiKey: process.env.EPAYCO_API_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: "ES",
  test: false
});

module.exports = {
  getDataGet: getDataGet,
  getDataPost: getDataPost,
  postPayment: postPayment,
  createToken: createToken,
  getInvoice: getInvoice
  // charge: charge
}

function getInvoice(req, res) {  
    if(!req.session){  
      req.session.save();
    }
    
    db.sequelize.query("SELECT fnt_consecutive_invoice(:session_id) invoice", {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        session_id: req.session.id //req.connection.remoteAddress.replace('::ffff:','') //req.session.id req.connection.remoteAddress.replace('::ffff:','')
      }
    }).then((response) => {
      if(!req.session.invoice){
        req.session.invoice = response[0].invoice;  
        req.session.save();
      }
      res.json(response);
    }).catch((error) => {
      console.log(error);
    });
}

// Get information about payment
function getDataGet(req, res) {
  let user = null;
  request(process.env.EPAYCO_URL_VALIDATION + req.query.ref_payco, function (error, response, body) {
    user = JSON.parse(body);
    postPayment(user, res, req.query.ref_payco);
    switch (user.data.x_cod_transaction_state) {
      case 1: //Aceptada
        res.redirect(process.env.EPAYCO_URL_LOADING + 'aceptada');
        break;
      case 2: // Rechazada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'rechazada');
        break;
      case 3: // Pendiente
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'pendiente');
        break;
      case 4: // Fallida
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'fallida');
        break;
      case 6: // Reversada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'reversada');
        break;
      case 7: // Retenida
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'retenida');
        break;
      case 8: // Iniciada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'iniciada');
        break;
      case 9: // Exprirada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'exprirada');
        break;
      case 10: // Abandonada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'abandonada');
        break;
      case 11: // Cancelada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'cancelada');
        break;
      case 12: // Antifraude
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'antifraude');
        break;
    }
  });
}

function getDataPost(req, res) {
  // console.log(req.query.ref_payco);
  let user = null;
  request(process.env.EPAYCO_URL_VALIDATION + req.query.ref_payco, function (error, response, body) {
    // console.log(body);
    user = JSON.parse(body);
    postPayment(user, res, req.query.ref_payco);
    switch (user.data.x_cod_transaction_state) {
      case 1: //Aceptada
        res.redirect(process.env.EPAYCO_URL_LOADING + 'aceptada');
        break;
      case 2: // Rechazada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'rechazada');
        break;
      case 3: // Pendiente        
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'pendiente');
        break;
      case 4: // Fallida
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'fallida');
        break;
      case 6: // Reversada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'reversada');
        break;
      case 7: // Retenida
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'retenida');
        break;
      case 8: // Iniciada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'iniciada');
        break;
      case 9: // Exprirada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'exprirada');
        break;
      case 10: // Abandonada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'abandonada');
        break;
      case 11: // Cancelada
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'cancelada');
        break;
      case 12: // Antifraude
        res.redirect(process.env.EPAYCO_URL_TRANSACTION + 'antifraude');
        break;
    }
  });
}

// Add Payment
function postPayment(req, res, ref_payco) {
  // console.log(req);
  if (req.data != null) {
    req.data.tbl_plans_plan_id = req.data.x_extra1;
    req.data.tbl_users_user_id = req.data.x_extra2;
    if (req.data.x_extra3 == "undefined" || req.data.x_extra3 == "null" || req.data.x_extra3 == "") {
      req.data.tbl_codes_code_id = null;
    } else {
      req.data.tbl_codes_code_id = req.data.x_extra3;
    }
    req.data.x_extra4 = ref_payco;
    Payment.create(req.data)
      .then(() => {
        // res.redirect('https://apptamic.com/#/auth/login');
      })
      .catch(() => {
        // res.redirect('https://apptamic.com/#/auth/register');
      })
  } else {
    req.body.tbl_plans_plan_id = req.body.x_extra1;
    req.body.tbl_users_user_id = req.body.x_extra2;
    req.body.tbl_codes_code_id = req.body.x_extra3;
    Payment.create(req.body)
      .then(() => {
        res.send("Ok");
      })
      .catch(() => {
        res.send("Error");
      })
  }
}

// Create Epayco Token
function createToken(req, res) {
  var credit_info = {
    'card[number]': req.body.number,
    'card[exp_year]': req.body.exp_year,
    'card[exp_month]': req.body.exp_month,
    'card[cvc]': req.body.cvc
  }
  epayco.token.create(credit_info)
    .then(function (token) {      
      createClient(token, req, res);
    })
    .catch(function (err) {
      res.send('error token: ' + err)
    })
}

// Create Epayco Client
function createClient(token, user, res) {
  var customer_info = {
    token_card: token.data.id,
    name: user.body.name + " " + user.body.lastname,
    email: user.body.email,
    phone: user.body.phone,
    default: true
  }
  epayco.customers.create(customer_info)
    .then(function (customer) {      
      createSubscription(token, customer, user, res)
    })
    .catch(function (err) {
      res.send('error client: ' + err)
    });
}

// Create Epayco Subscription
function createSubscription(token, customer, user, res) {
  var subscription_info = {
    id_plan: user.body.plan_id,
    customer: customer.data.customerId,
    token_card: token.data.id,
    doc_type: user.body.tbl_types_type_id,
    doc_number: user.body.identification
  }

  if (user.body.x_extra3 == "undefined" || user.body.x_extra3 == "null" || user.body.x_extra3 == "") {
    user.body.x_extra3 = null;
  }
  
  epayco.subscriptions.create(subscription_info)
    .then(function (subscription) {      
      user.body.tbl_plans_plan_id = user.body.x_extra1;
      user.body.tbl_users_user_id = user.body.x_extra2;
      user.body.tbl_codes_code_id = user.body.x_extra3;
      user.body.x_extra5 = subscription.id;
      user.body.x_extra6 = customer.data.customerId;
      user.body.x_cust_id_cliente = customer.data.customerId;
      user.body.x_extra7 = token.data.id;      
      user.body.x_extra8 = user.body.tbl_types_type_id;
      user.body.x_extra9 = user.body.identification;
      if (subscription.status) {
        var subscription_info = {
          id_plan: user.body.tbl_plans_plan_id,
          customer: user.body.x_extra6,
          token_card: user.body.x_extra7,          
          doc_type: user.body.x_extra8,
          doc_number: user.body.x_extra9
        }
        epayco.subscriptions.charge(subscription_info)
          .then(function (subscription) {
            if(subscription.success){
              user.body.x_extra4 = subscription.data.ref_payco;
              user.body.x_ref_payco = subscription.data.ref_payco;
              user.body.x_extra10 = subscription.data.factura;
              user.body.x_customer_ip = subscription.data.ip;
              Payment.create(user.body)
              .then(() => {
                // console.log(result);
                // res.send("Ok");
              })
              .catch(() => {
                // console.log(error);
                // res.send("Error");
              })  
              res.send("Suscripción exitosa")
            } else {
              res.send("La suscripción no fue exitosa")
            }            
          })
          .catch(function (err) {
            console.log("err: " + err);
          })
      } else {
        res.send("Error en la tarjeta de crédito")
      }
    })
    .catch(function (err) {
      res.send('error subscription: ' + err)
    })
}
