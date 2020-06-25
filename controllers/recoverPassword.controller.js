const User = require('../models/user')
const db = require('../database/db')
const nodemailer = require('nodemailer')

const fs = require('fs')

module.exports = {
    postEmailFootprint: postEmailFootprint,
    getEmailFootprint: getEmailFootprint,
    updatePassword: updatePassword
}

/**
 * Function Generate code de autentication
 * @param {*} email -> correo electronico
 * @param {*} callBack -> funcion de retorno de datos
 */
function generatedCodeAutentication(email, callBack) {
    db.sequelize.query("select upper(sha2(CONCAT(:email,now()), 256)) link;", {
            replacements: {
                email: email
            },
            type: db.sequelize.QueryTypes.SELECT
        })
        .then((code) => {
            console.log('code', code);
            callBack(code);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

/**
 * Function validate register code email
 * @param {String} email 
 * @param {Function} callBack 
 */
function validateRegisterCodeEmail(email, callBack) {
    db.sequelize.query("SELECT COUNT(lrp.link_recover_password_id) statusLink FROM tbl_link_recover_password lrp WHERE lrp.email_footprint = SHA2(:email,256) AND lrp.state = 1;", {
            replacements: {
                email: email
            },
            type: db.sequelize.QueryTypes.SELECT
        })
        .then((code) => {
            console.log('code', code);
            callBack(code);
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

/**
 * Function register password reset request
 * @param {any} req 
 * @param {any} res 
 */
function postEmailFootprint(req, res) {
    console.log(req.body.email);
    User.findAndCountAll({
        where: {
            email: `sha2(${req.body.email},256)`
        }
    }).then(response => {
        console.log(response);
        if (parseInt(response.count) === 1) {
            validateRegisterCodeEmail(req.body.email, (existLink) => {
                if (!existLink[0].statusLink) {
                    generatedCodeAutentication(req.body.email, (code) => {
                        db.sequelize.query("insert into tbl_link_recover_password(link_recover_password_id, email_footprint, code, expiration_date) values (fnt_uuidv4(), sha2(:email,256), :code, DATE_ADD(NOW(), INTERVAL 1 HOUR));", {
                                type: db.sequelize.QueryTypes.INSERT,
                                replacements: {
                                    email: req.body.email,
                                    code: code[0].link
                                }
                            })
                            .then((link) => {
                                sendEmail(req.body.email, code[0].link.toString());
                                res.json("El link para recuperar la cuenta ha sido enviado a su correo electronico: " + req.body.email)
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })
                } else {
                    res.json("Ya se genero un enlace para restablecer la contraseña y ha sido enviado a su correo electronico: " + req.body.email)
                }

            });

        } else {
            res.json("El correo no esta registrado en ");
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}

/**
 * Function para obtener el email footprint
 * @param {any} req 
 * @param {any} res 
 */
function getEmailFootprint(req, res) {
    if (req.params.id) {
        validateStatusCode(req.params.id, (response) => { res.json(response[0].state) });
    }
}

/**
 * Function validate status code 
 * @param {String} code 
 * @param {Function} callBack 
 */
function validateStatusCode(code, callBack) {
    if (code) {
        db.sequelize.query("SELECT lrp.state, lrp.email_footprint FROM tbl_link_recover_password lrp WHERE lrp.code = :code", {
                type: db.sequelize.QueryTypes.SELECT,
                replacements: {
                    code: code
                }
            })
            .then(response => {
                callBack(response);
            })
            .catch(err => {
                callBack(err);
            })
    }
}

/**
 * Function send email
 * @param {String} email 
 * @param {String} code 
 */
function sendEmail(email, code) {
    let body = null;
    fs.readFile('./static/mailTemplate/es/recoverPassword.html', 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            body = data.replace(':link', code);
            var transporter = nodemailer.createTransport({
                host: "mail.apptamic.com",
                port: 465,
                secure: true, // upgrade later with STARTTLS
                auth: {
                    user: 'notificacion@apptamic.com',
                    pass: 's8vSkN4GGxUN6ae'
                }
            });

            var mailOptions = {
                from: 'Recuperación de cuenta Tamic <notificacion@apptamic.com>',
                to: email,
                subject: 'Recuperación de cuenta Tamic',
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

/**
 * Function update password
 * @param {any} req 
 * @param {any} res 
 */
function updatePassword(req, res) {
    validateStatusCode(req.body.code, (response) => {

        if (parseInt(response[0].state)) {
            //DESHABILITA EL CODIGO DE ACTUALIZAR CONTRASEÑA
            db.sequelize.query("UPDATE tbl_link_recover_password lrp set lrp.state = 0 WHERE lrp.code = :code", {
                    type: db.sequelize.QueryTypes.UPDATE,
                    replacements: {
                        code: req.body.code
                    }
                })
                .then(response => {

                    //ACTUALIZA LA CONTRASEÑA
                    db.sequelize.query("UPDATE tbl_users s set s.password = :password, s.updated_at = now() WHERE s.email_footprint = sha2(:email,256) and s.state = 1", {
                            type: db.sequelize.QueryTypes.UPDATE,
                            replacements: {
                                email: response[0].email_footprint,
                                password: req.body.password
                            }
                        })
                        .then(response => {
                            res.json('Contraseña actualizada correctamente');
                        })
                        .catch(err => {
                            res.json('Error al actualiza la contraseña');
                        });
                }).catch(err => {
                    res.json('Error de autenticacion');
                });
        }
    });
}