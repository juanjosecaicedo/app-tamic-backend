// const events = require('./events_socket/events.js');
// const sharedsession = require("express-socket.io-session");
// const io = null;

// module.exports = {
//     startSocket: startSocket
// }

// function setSession(session) {
//     io.use(sharedsession(session));
// }

// function startSocket(session, server, port) {
    
//     //io = require('socket.io')(server);

//     // setSession(session);

//     // io.on('connection', client => {
//     //     events.initSocket(client);
//     //     client.on('disconnect', (e) => { 
//     //         e.handshake.session.destroy();
//     //         e.handshake.session.save();
//     //         console.log('disconnect', e); 
//     //     });
//     // });
//     // console.log('Socket is run in the port: ' + port);
// }