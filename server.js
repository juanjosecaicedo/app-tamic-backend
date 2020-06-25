const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const cors = require('cors');
const events = require('./events_socket/events.js');
const sharedsession = require("express-socket.io-session");
const charge = require('./controllers/charge.controller.js');
const fs = require("fs");
const https = require("https");
const http = require("http");
const dotenv = require('dotenv').config();

const VueRouterSitemap = require('vue-router-sitemap');


var users_conected = 0;

const sitemapMiddleware = () => {
    return (req, res) => {
        res.set('Content-Type', 'application/xml');
        const staticSitemap = path.resolve('dist/static', 'sitemap.xml');
        const filterConfig = {
            isValid: false,
            rules: [
                /\/example-page/,
                /\*/,
            ],
        };
        new VueRouterSitemap(router).filterPaths(filterConfig).build(process.env.HTTPS_ORIGIN_HOST).save(staticSitemap);
        return res.sendFile(staticSitemap);
    };
};


//VARIABLES DE CONFIGURACION
const config = {
    port: process.env.PORT,
    host: process.env.HOST
}

//CERTIFICADO SSL PARA ESTE SERVIDOR
const privateKey = fs.readFileSync('sslcert/server.key').toString();
const certificate = fs.readFileSync('sslcert/server.crt').toString();

const credentials = {
    key: privateKey,
    cert: certificate
};

//INICIA LA INSTANCIA DE EXPRESS
var app = express();

// IMPLMENTACION DEL USO DE HELMET -> TRAE MUCHAS FUNCIONES DE PROTECCION PARA LOS ATAQUES
app.use(helmet());

// SEGURIDAD CONTRA ATAQUES
app.disable('x-powered-by');

// CONFIGURACION DE HSTS
app.use(helmet.hsts({
    // Must be at least 1 year to be approved = 31536000
    // Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains". = 5184000
    maxAge: 5184000,
    // Must be enabled to be approved
    includeSubDomains: true,
    preload: true
}));

// CONFIGURACION DE XSS
app.use(helmet.xssFilter({
    setOnOldIE: true
}));


// CONFIGURACION DE PREVENCION DE CLICKJACKING
app.use(helmet.frameguard({
    action: 'deny'
}));

app.get('/sitemap.xml', sitemapMiddleware());

app.get('/online', (req, res)=>{
    res.send(`Usuarios conectados: ${users_conected}`);
});

// CONFIGURACION DE SESION STORE
var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
};

// INSTANCIA DE SESSION STORE PARA ALMACENAR LA SESION EN LA BASE DE DATOS
var sessionStore = new MySQLStore(options);

// CLAVE SECRETA PARA CIFRAR EL CONTENIDO DE LAS COOKIES
var key_secret = process.env.COOKIE_SECRET;

// CONFIGURACION DE SESSION
const instancia_session = session({
    // genid: (req)=>{ 
    //     return genuuid(); //  usa UUID para ID de sesión  
    // },
    secret: key_secret,
    resave: false,
    //domain: 'localhost',
    // cookie: { 
    //     secure: true, 
    //     //maxAge: 60000 
    // },
    store: sessionStore,
    saveUninitialized: true
});

app.use(instancia_session);

// CONFIGURACION DE FILE UPLOAD
app.use(fileUpload());

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(bodyParser.json({
    limit: process.env.LIMIT_BODY_PARSER,
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: process.env.LIMIT_BODY_PARSER,
    extended: true
}));
app.set('trust proxy', true);
app.use('/api', routes);

//INICIA LA CONFIGURACION DEL SERVIDOR HTTPS CON EXPRESS
let server; // Definición del servidor
if(process.env.ENVIROTMENT == 'LOCAL'){
    server = http.createServer(credentials, app);
} else {
    server = https.createServer(credentials, app);
}


// CONFIGURACION DE SOCKETS
const io = require('socket.io')(server);

io.use(sharedsession(instancia_session));

io.on('connection', client => {
    //  console.log("Nueva conexion socket", client.handshake.session.id);

    users_conected++;
    

    events.initSocket(client);


    //Activa la session del usuario
    if (client.handshake.session.watch === 0 && client.handshake.session.online === 0) {
        //     client.handshake.session.watch = 0;

        client.emit('client_connection');

        client.handshake.session.online = 1;
        client.handshake.session.save();
    }

    client.on('disconnect', (e) => { 
        console.log("Cliente desconectado: ", e);
        users_conected--;
        
    });
    

    // client.on('disconnect', (e) => { 
    //     // console.log('disconnect ', client.handshake.session.id); 
    //     // if(client.handshake.session.online === undefined){
    //     //     client.handshake.session.destroy();
    //     // }else 
    //     if(client.handshake.session.watch !== undefined && client.handshake.session.online !== undefined){
    //         client.handshake.session.watch = 0;
    //         client.handshake.session.online = 0;
    //         client.handshake.session.save();
    //     }
    // });

    //     // if (client.handshake.session) {

    //     //     //Desactiva la session del usuario
    //     //     if(client.handshake.session.watch !== undefined && client.handshake.session.online !== undefined){
    //     //         client.handshake.session.watch = 0;
    //     //         client.handshake.session.online = 0;
    //     //         client.handshake.session.save();
    //     //     }
    //     // }
    //     console.log('disconnect ' + client.handshake.session.id); 
    //     console.log('Destruye componente');
    //     //client.handshake.session.destroy();

    //     // if(client.handshake.session.watch !== undefined && client.handshake.session.online !== undefined){
    //     //     client.handshake.session.watch = 0;
    //     //     client.handshake.session.online = 0;
    //     //     client.handshake.session.save();
    //     // }else{
    //     //     //destruye la session no iniciada
    //     //     client.handshake.session.destroy();
    //     // }

    //     // console.log('disconnect'); 
    // });
});

//INICIA SERVIDOR
server.listen(config.port, function(e) {
    console.log('Servidor inicio en el puerto ' + config.port + " en el host " + config.host);
    console.log(process.env.DB_PASSWORD);
});