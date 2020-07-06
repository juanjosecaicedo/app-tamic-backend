var request = require('request');
const db = require('../database/db')
const fs = require('fs')
const nodemailer = require('nodemailer')
const Payment = require('../models/epayco.payment')
const uuidV1 = require('uuid/v1');
const dotenv = require('dotenv').config();

var epayco = require("epayco-node")({
    apiKey: process.env.EPAYCO_API_KEY,
    privateKey: process.env.EPAYCO_PRIVATE_KEY,
    lang: "ES",
    test: false
});

function updatePaymentStatus() {
    console.log("Validate pending payment");
    db.sequelize.query("CALL proc_charge_pending()", {
            // type: db.sequelize.QueryTypes.SELECT
        })
        .then(result => {
            for (const i in result) {
                if (result[i].x_response == "Pendiente" && result[i].x_extra4 != null && result[i].x_extra4 != "") {
                    request(process.env.EPAYCO_URL_VALIDATION + result[i].x_extra4, function (error, response, body) {
                        let res = ""
                        try {
                            res = JSON.parse(body).data.x_response;
                        } catch(e) {
                            res = ""
                            console.log(e)
                        }                                                
                        if (res == "Aceptada") {
                            db.sequelize.query("UPDATE tbl_epayco_payments SET x_respuesta = :response, x_response = :response WHERE epayco_payment_id = :id ", {
                                replacements: {
                                    id: result[i].epayco_payment_id,
                                    response: res
                                },
                                type: db.sequelize.QueryTypes.UPDATE
                            }).then(() => {
                                sendEmail(result[i].email);
                            })
                        }
                    })
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function chargeSubscription() {
    console.log("Validate subscription");
    db.sequelize.query("CALL proc_charge_subscription()", {
        // type: db.sequelize.QueryTypes.SELECT
    }).then(result => {
        for (const i in result) {
            var subscription_info = {
                id_plan: result[i].tbl_plans_plan_id,
                customer: result[i].x_extra6,
                token_card: result[i].x_extra7,
                doc_type: result[i].x_extra8,
                doc_number: result[i].x_extra9
            }

            epayco.subscriptions.get(result[i].x_extra5)
                .then(function (subscription) {
                    // console.log(subscription.status_plan);
                    if (subscription.status_plan == "canceled") {
                        console.log("plan cancelado")
                    } else {
                        epayco.subscriptions.charge(subscription_info)
                            .then(function (subscription) {
                                // console.log(subscription)
                                if (!subscription.status) {
                                    console.log("Servicio activo en ePayco");
                                } else {
                                    db.sequelize.query("DELETE FROM tbl_services WHERE service_id = :id", {
                                        replacements: {
                                            id: result[i].service_id
                                        },
                                        type: db.sequelize.QueryTypes.DELETE
                                    }).then(() => {
                                        result[i].epayco_payment_id = uuidV1();
                                        Payment.create(result[i])
                                            .then(result => {
                                                console.log(result);
                                                sendEmail(result[i].x_customer_email);
                                            })
                                            .catch(() => {
                                                console.log(error);
                                            })
                                    });
                                }
                            })
                            .catch(function (err) {
                                console.log("err: " + err);
                            })
                    }
                })
                .catch(function (err) {
                    console.log("err: " + err);
                })
        }
    });
}

setInterval(function () {
    updatePaymentStatus()
}, 3600000);
// setInterval(function () {
//     updatePaymentStatus()
// }, 60000);

setInterval(function () {
    chargeSubscription()
}, 43200000);
// setInterval(function () {
//     chargeSubscription()
// }, 60000);

function sendEmail(email) {
    let body = null;
    fs.readFile('./static/mailTemplate/es/notification.html', 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            body = data.replace(':link', email);
            var transporter = nodemailer.createTransport({
                host: "mail.apptamic.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'notificacion@apptamic.com',
                    pass: 's8vSkN4GGxUN6ae'
                }
            });

            var mailOptions = {
                from: 'Confirmación de pago Tamic <notificacion@apptamic.com>',
                to: email,
                subject: 'Confirmación de pago Tamic',
                html: body
            };

            transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response);
                }
            });
        }
    });
}