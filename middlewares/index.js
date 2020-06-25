const middlewares = {

    validatedIP: (req, res, next) => {
        // next();
        let ip = req.connection.remoteAddress.replace('::ffff:','');
        // console.log('Session Online: ',req.session.online);


        // console.log('req:',req.originalUrl);
 
        // if(req.session.ip === ip){
        //     next();
        // }else{
        
        //    res.send(200);
            
        // }

        // if(req.session.online != undefined ){
            
            if(req.session.online === 1){
                next();
            }else{
                console.log('SESSION IP: ',req.session.ip,' = IP ADDRESS: ', ip, 'Session: ',req.session);
                res.sendStatus(200);    
            }
            
            //ROL CLIENTE 
            // if(req.session.tbl_roles_role_id === 'c1a0761a-09a5-4cdd-b213-ec4639c55c06'){
            //     if(req.session.device_id === req.params.){

            //     }
            // }

            // //ROL EMPRESA
            // if(req.session.tbl_roles_role_id === '13b53dc5-f9b9-4275-bbf3-3617d09670ae'){

            // }

            // //ROL ADMINISTRADOR
            // if(req.session.tbl_roles_role_id === 'db2b9bdb-79c5-48d4-901c-09882a4db6eb'){

            // }
        // }
        // else{
        //     res.send(401);
        // }

        //console.log('req:',req.originalUrl);
        // next();
        //if(req.session.ip === ip){
            
        //}else{
           // console.log('SESSION IP: ',req.session.ip,' = IP ADDRESS: ', ip);

            //
        //}
    }
};
module.exports = middlewares;