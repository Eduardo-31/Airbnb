const userControllers = require('./users.controllers')


const getAll = (req, res) => {
    userControllers.getAllUsers()
        .then(response => {
            res.status(200).json({items: response.length, users: response})
        })
        .catch(err => {
            res.status(404).json({err})
        })
}


const getById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)
    // me retorna null en el caso que el UUID no exista
        .then(response => {
            if (response !== null) {
                res.status(200).json(response)
            }else{
                res.status(404).json({message: `Invalid ID`})  
            }
        })
        .catch(err => {
            res.status(404).json({message: `Invalid ID`, err})  
        })

}

const register = (req, res) => {
    const data = req.body
    
    if(
        !data.firstName ||
        !data.lastName ||
        !data.gender ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.birthdayDate
    ){
        return res.status(400).json({
            message: 'All fields must be completed',
            filds: {
                firstName: 'string',
                lastName: 'string',
                gender: 'string',
                email: 'example@example.com',
                password: 'string',
                phone: 'string',
                birthdayDate: 'DD/MM/YYYY'
            }
        });
    } else {
        userControllers.createUser(data)
            .then(response => {
                res.status(201).json({
                    message: `User created succesfully with id: ${response.id}`,
                    user: response
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
}

const remove = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
        .then(response => {
            if(response){
                //res.status(204).json()
                res.status(200).json()
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({err})
        })
}


const update = (req, res) => {
    const id = req.params.id
    const data = req.body
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing Data'})
    } else if (
        data.firstName ||
        data.lastName ||
        data.gender ||
        data.email ||
        data.phone ||
        data.birthdayDate ||
        data.dni ||
        data.roleId ||
        data.address ||
        data.status
    ){
        userControllers.updateUser(id, data, req.user.role)
       .then(response => {
            if(response[0]){
                res.status(200).json(response)
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
       })
       .catch(err =>  {
            res.status(400).json(err)
        })

    } else {
        res.status(400).json({
            message: 'At least one field must be filled',
            filds: {
                firstName: 'string',
                lastName: 'string',
                gender: 'string',
                email: 'example@example.com',
                phone: '+52 31435143',
                birthdayDate: 'YYYY/MM/DD',
                dni: "string",
                roleId: 'UUID/STRING',
                address: 'string',
                status: 'string'
            }
        })
    }

}


const updateMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing Data'})
    } else if (
        data.firstName ||
        data.lastName ||
        data.gender ||
        data.email ||
        data.phone ||
        data.birthdayDate ||
        data.dni ||
        data.address ||
        data.status
    ){
        userControllers.updateUser(id, data, req.user.role)
            .then(response => {
                if(response[0]){
                    //res.status(200).json(response)
                    res.status(200).json({
                        message: `you have successfully edited the user ${response.email}`,
                        response
                    })
                }else{
                    res.status(400).json({message: 'Invalid ID'})
                }
            })
            .catch(err =>  {
                res.status(400).json(err)
            })
    } else {
        res.status(400).json({
            message: 'At least one field must be filled',
            filds: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+52 31435143',
                birthday_date: 'DD/MM/YYYY',
                profile_image: 'example.com/img/example.png',
                country: 'string',
                is_active: true
            }
        })
        
    }

}

const getMyUser = (req, res) => {
    const id = req.user.id
    userControllers.getUserById(id)
        .then(response => {
            if (response !== null) {
                res.status(200).json(response)
            }else{
                res.status(404).json({message: `Invalid ID`})  
            }
        })
        .catch(err => {
            res.status(404).json({err})  
        })    

}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    userControllers.deleteUser(id)
    .then(response => {
        if(response){
            res.status(200).json()
        }else{
            res.status(400).json({message: 'Invalid ID'})
        }
    })
    .catch(err => {
        res.status(400).json({err})
    })
}


const getUserRole = (req, res) => {
    const id = req.params.id
    userControllers.getUserWithRole(id)
        .then(response => {
            if(response !== null){
                res.status(201).json({user: response})
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err => res.status(400).json(err))
}


module.exports = {
    getAll,
    getById,
    register,
    remove,
    update,
    updateMyUser,
    getMyUser,
    deleteMyUser,
    getUserRole
}