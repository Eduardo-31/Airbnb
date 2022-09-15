const Roles = require("../models/roles.model")


const roleAdminMiddleware = (req, res, next) => {
    
    Roles.findOne({
        where: {
            name: 'admin'
        }
    })
        .then(response => {
            const rol = req.user.role
            if(rol === response.id){
                next();
            }else{
                res.status(401).json({
                    status: 'error',
                    message: 'User not authorized to make this request'
                });
            }
        })
        .catch(err => {
            res.status(401).json({
                status: 'error',
                message: 'User not authorized to make this request'
            })
        })
}

const roleHostMiddleware = (req, res, next) => {
    
    Roles.findOne({
        where: {
            name: 'host'
        }
    })
        .then(response => {
            const rol = req.user.role
            if(rol === response.id){
                next();
            }else{
                res.status(401).json({
                    status: 'error',
                    message: 'User not authorized to make this request'
                });
            }
        })
        .catch(err => {
            res.status(401).json({
                status: 'error',
                message: 'User not authorized to make this request'
            })
        })
}

exports.roleAdminMiddleware = roleAdminMiddleware
exports.roleHostMiddleware = roleHostMiddleware















        /*const roleAdminMiddleware = (req, res, next) => {
            const rol = req.user.rol
        
            if(rol === 'admin'){
                next()
            }else{
                res.status(401).json({status: 'error', message: 'User not authorized to make this request' })
            }
        }*/