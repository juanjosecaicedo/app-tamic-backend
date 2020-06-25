const db = require('../database/db');

const events = {
    socketIO: null,
    arrayEvents: [{
            nameEvent: "clear_code_invoice",
            callBack: (receivedData = null) => {
                //select vul.* from view_users_login vul where vul.email_footprint = sha2(:email,256) and vul.password = :password
                if (events.socketIO.handshake.session) {
                    db.sequelize.query("CALL proc_update_temporaly_code_invoice(:session_id)", {
                            // type: db.sequelize.QueryTypes.SELECT,
                            replacements: {
                                session_id: events.socketIO.handshake.session.id // client.handshake.address.replace('::ffff:','')receivedData.email
                            }
                        })
                        .then((responseQuery) => {
                            console.log("responseQuery clear_code_invoice: ", responseQuery);
                            // events.socketIO.emit("clear_code_invoice", { status: 200, data: responseQuery });
                        })
                        .catch(errorQuery => {
                            console.log("errorQuery clear_code_invoice: ", errorQuery);
                            // events.socketIO.emit("clear_code_invoice", { status: 500, data: errorQuery });
                        });
                }
            }
        },
        {
            nameEvent: "notification",
            callBack: (receivedData = null) => {
                console.log(receivedData.message);
                console.log("responseQuery notification: ");
                events.socketIO.broadcast.emit("notification", { status: 200, message: 'Hola' });
                events.socketIO.emit("notification", { status: 200, message: 'Hola' });
                if (receivedData) {
                    //select vul.* from view_users_login vul where vul.email_footprint = sha2(:email,256) and vul.password = :password
                    db.sequelize.query("insert into tbl_notifications values (fnt_uuidv4(), :message, now()) ", {
                            type: db.sequelize.QueryTypes.INSERT,
                            replacements: {
                                message: receivedData.message
                            }
                        })
                        .then((responseQuery) => {
                            console.log("responseQuery notification: ", responseQuery);
                            events.socketIO.broadcast.emit("notification", { status: 200, message: receivedData.message });
                            events.socketIO.emit("notification", { status: 200, message: receivedData.message });
                        })
                        .catch(errorQuery => {
                            console.log("errorQuery notification: ", errorQuery);
                            events.socketIO.emit("notification", { status: 500 });
                        });
                }
            }
        }
    ]
};

function initSocket(io) {
    //REGISTRANDO LA INSTACION DE SOCKETS IO
    events.socketIO = io;

    //INCIALIZANDO LOS EVENTOS
    events.arrayEvents.forEach((e) => {
        events.socketIO.on(e.nameEvent, e.callBack);
    });
}

module.exports = { initSocket };