const uuid = require('uuid')
const Roles = require('../models/roles.model')
const Users = require('../models/user.model')
const { hashPassword } = require('../utils/crypt')


const getAllUsers = async() => {

    const data = await Users.findAll({
        /*attributes: {
            exclude: ['password']
        }*/
    })

    return data;

    //? select * from users;
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ['password']
        }
    })
    return data
    //? select * from users where id = ${id};
}

const createUser = async(data) => {

    const newUser = await Users.create({
        id: uuid.v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        email: data.email,
        password: hashPassword(data.password),
        phone: data.phone,
        birthdayDate: data.birthdayDate,
        dni: data.dni,
        roleId: '3ea6f19d-3c33-4b2a-8b23-46cbedd94ed2',
        address: data.address,
        profileImage: data.profileImage,
        status: 'active', 
        verified: false 
    })
    return newUser;
}


const updateUser = async(userId, data, userRol) => {
    // role admin
    const rol = await Roles.findOne({where: {id: userRol}})

    if(userRol === rol.id){
        const { id, password, profileImage, verified, ...newData } = data
        const response = await Users.update({
            ...newData
        },{
            where: {
                id: userId
            }
        })
        return response
    }else{
        const { id, password, profileImage, verified, roleId,  ...newData } = data
        const response = await Users.update({
            ...newData
        },{
            where: {
                id: userId
            }
        })
        return response
    }
}

const deleteUser = (id) => {
    const data = Users.destroy({
        where: {
            id
        }
    })
    return data;
}

const getUserWithRole = async (id) => {
    const data = await Users.findOne({
        where: {
            id
        },
        attributes:{
            exclude: ["createdAt", "updatedAt", "password"]
        },
        include: {
            model: Roles,
            attributes: {
                exclude: ["id","createdAt", "updatedAt"]
            }
        }
    })
    return data
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserWithRole
}