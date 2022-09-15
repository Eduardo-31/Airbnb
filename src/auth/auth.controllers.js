const Users = require('../models/user.model')
const { comparePassword } = require('../utils/crypt')

const loginUser = async(email, password) => {
   // user.password = Contraseña hasheada
   // password = Contraseña en texto plano
   const response = await Users.findOne({
        where:{
            email
        }
   })
    
        if(response !== null){
            const verify_password =  comparePassword(password, response.password)
            if(verify_password){
                return response
            }
        }
        return false
    

   /*if(user){
       const verify_password =  comparePassword(password, user.password)
        if(verify_password){
            return user
        }
   }
   return false
}*/
}
//console.log(loginUser('example@example.com','string'))

module.exports = {
    loginUser
}