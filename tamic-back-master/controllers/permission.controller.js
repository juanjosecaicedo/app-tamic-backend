module.exports = {
  getPermission: getPermission,
  getSession: getSession
}

// getPermission
function getPermission(req, res) {
    res.json({status:200, rol_id:req.session.tbl_roles_role_id });
    // res.send({status:'SessionNoValidated'});
}


// getPermission
function getSession(req, res) {  
  res.json({session:{online: req.session.online || 0, rol_id: req.session.tbl_roles_role_id || null, status_service: req.session.status_service || 0}}); 
}
