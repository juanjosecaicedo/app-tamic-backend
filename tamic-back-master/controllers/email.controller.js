const nodemailer = require('nodemailer')

module.exports = {
    sendEmail: sendEmail
}

function sendEmail(req, res) {
    var transporter = nodemailer.createTransport({
        host: "mail.apptamic.com",
        port: 465,
        secure: true,
        auth: {
            user: 'notificacion@apptamic.com',
            pass: 'n~4S~CzX(~4U'
        }
    });

    var mailOptions = {
        from: "Soporte <" + req.body.from + ">",
        to: 'notificacion@apptamic.com',        
        subject: "Soporte " + req.body.name,
        html: req.body.message + "<br>correo: " +
            req.body.from + "<br>nombre: " + req.body.name
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.json(error);
        } else {
            res.json(response);
        }
    });
}