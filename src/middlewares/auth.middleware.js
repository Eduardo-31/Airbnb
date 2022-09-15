const Users = require("../models/user.model");
const { getUserById } = require("../users/users.controllers");

const JwtStrategy = require("passport-jwt").Strategy,
        ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: "academlo" // debe estar en una variable de entorno
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {

            // tambien se puede hacer de esta forma siempre y cuando uses async
            // const data = await Users.findOne({
            //     where:{id:decoded.id}})
            // console.log("qfwwwwwwwwwwwwwwwww")
            // if(data){
            //     console.log("DATAAAAAAAAAAA",data)
            //     console.log("decoded jwt", decoded);
            //     return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
            // }else{
            //     console.log("DATAAAAAAAAAAA",data)
            //         //console.log("decoded jwt", decoded);
            //         return done(null, false); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
            // }
                
                getUserById(decoded.id)
                .then(res => {
                    if(res){
                        console.log("decoded jwt", decoded);
                        return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
                    }else{
                        console.log("decoded jwt", decoded);
                        return done(null, false); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
                    }  
                })
                .catch(err => {
                    return done(err)
                })
                
        })
    );
};