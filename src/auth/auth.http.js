const jwt = require('jsonwebtoken')
const { loginUser } = require('./auth.controllers')

const login = (req, res) => {
    const data = req.body
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing data'})
    }
    if(!data.email || !data.password){
        res.status(400).json({message: 'Missing data'})
    }

    /*const response = loginUser(data.email, data.password)
    if(response){
        const token = jwt.sign({
            id: response.id,
            email: response.email,
            rol: response.rol
        },'academlo')
        res.status(200).json({
            message: 'Tus credenciales son correctas',
            token
        })
    } else {
        res.status(401).json({message: 'Invalid Credentials'})
    }*/

    loginUser(data.email, data.password)
        .then(response => { 
            if(response){
                console.log(response,'asffffffffffff')
                const token = jwt.sign({
                    id: response.id,
                    email: response.email,
                    role: response.roleId
                },'academlo')
                res.status(200).json({
                    message: 'Tus credenciales son correctas',
                    token
                })
            } else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(err => res.status(401).json({err}))
}


module.exports = {
    login
}