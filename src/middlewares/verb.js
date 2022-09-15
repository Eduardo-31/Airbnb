const verbMiddleware = (req, res, next) => {
    console.log('Request', req.method)
    if(req.method === 'GET'){
        console.log('peticion get exitosa')
        res.status(200).json({message: `peticion con el method GET`})
    }else{
        next()
    }
}

exports.verbMiddleware = verbMiddleware 