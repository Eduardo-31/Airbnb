const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Reservations = require("../models/reservation.model");
const Users = require("../models/user.model");
const Roles = require("../models/roles.model");
const UserImages = require("../models/users_images.model")

const defaultData = async() => {
    await Roles.bulkCreate([
        {id: '3ea6f19d-3c33-4b2a-8b23-46cbedd94ed2', name: 'guest'},
        {id: '72f6e55e-629c-4a47-9731-32ffe6cc3428', name: 'host'},
        {id: '7d10290a-8cb9-48c4-8cb0-09970bddc299', name: 'admin'}
    ],{validate: true})
    await Users.bulkCreate([{
        id: "db0ef382-7cd9-4f1b-946c-0c14cc11913c",
        firstName: "Eduardo",
        lastName: "Izacupe",
        gender: "masculino",
        email: "eduardo@academlo.com",
        phone: "123456789",
        password: "$2b$10$uIBx3bG5iJcqJ3RlnqF4RONprG4qTsyLEmgMgr5VEtJjzcmQtfHxC",
        birthdayDate: "2000-01-01",
        roleId: "72f6e55e-629c-4a47-9731-32ffe6cc3428",
        address: "Peru",
        dni: "313131313131",
        status: "active",
        verified:false
        },
        {
        id: "645060d9-0d76-458c-8ed4-304024ddc303",
        firstName: "Lincoln",
        lastName: "Navigator",
        gender: "masculino",
        email: "elcapoadmin@academlo.com",
        phone: "123456789",
        password: "$2b$10$uIBx3bG5iJcqJ3RlnqF4RONprG4qTsyLEmgMgr5VEtJjzcmQtfHxC",
        birthdayDate: "2000-01-29",
        roleId: "7d10290a-8cb9-48c4-8cb0-09970bddc299",
        address: "Peru",
        dni: "313131313131",
        status: "active",
        verified:false
        },
        {
        id: "f7338fa6-6a52-4f4b-bc3c-5dcb2fff570d",
        firstName: "Catalina",
        lastName: "Samanta",
        gender: "masculino",
        email: "catalina@academlo.com",
        phone: "123456789",
        password: "$2b$10$uIBx3bG5iJcqJ3RlnqF4RONprG4qTsyLEmgMgr5VEtJjzcmQtfHxC",
        birthdayDate: "1998-01-20",
        roleId: "3ea6f19d-3c33-4b2a-8b23-46cbedd94ed2",
        address: "Colombia",
        dni: "313131313131",
        status: "active",
        verified:false
        },
        {
        id: "e26278a2-3b57-4774-b35d-7a5da5a8febc",
        firstName: "Pruebaaaa",
        lastName: "pruebaaa",
        gender: "masculino",
        email: "pruebaaa@academlo.com",
        phone: "123456789",
        password: "$2b$10$uIBx3bG5iJcqJ3RlnqF4RONprG4qTsyLEmgMgr5VEtJjzcmQtfHxC",
        birthdayDate: "1998-01-20",
        roleId: "72f6e55e-629c-4a47-9731-32ffe6cc3428",
        address: "Mexico",
        dni: "313131313131",
        status: "active",
        verified:false
        }
    ])

      

    await Places.bulkCreate([
        {
        id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
        city: 'Guadalajara',
        state: 'Jalisco',
        country: 'México',
        continent: 'America'
        },
        {
        id: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
        city: 'Zapopan',
        state: 'Jalisco',
        country: 'México',
        continent: 'America'
        },
        {
        id: '3436a556-6623-40ba-88b8-2e01009f9d82',
        city: 'Suba',
        state: 'Bogotá',
        country: 'Colombia',
        continent: 'America'
        },
        {
        id: '134a55b6-487c-46cc-a5b5-9392af20c205',
        city: 'Medellín',
        state: 'Antioquia',
        country: 'Colombia',
        continent: 'America'
        },
        {
        id: '3a230417-80ae-4232-a8ff-6fd50068a777',
        city: 'Azcapotzalco',
        state: 'CDMX',
        country: 'México',
        continent: 'America'
        },
        {
        id: '0d907427-7623-4ec9-8c6d-270bb92fbbe7',
        city: 'Monterrey',
        state: 'Muevo León',
        country: 'México',
        continent: 'America'
        },
    ])

    await Accommodations.bulkCreate([{
        id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
        title: "premium - vistas 360 ciudad (alberca y gym)",
        description: "asdfafasfasfasf-2331",
        guests: 6,
        rooms: 3,
        beds: 3,
        bathrooms: 4.5,
        price: 1536.00,
        hostId : 'db0ef382-7cd9-4f1b-946c-0c14cc11913c',
        score: 0.00,
        placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
        comision: 150.00
    },{
        id: "53cc017d-49f2-4d92-841b-23efe9e6233e",
        title: "Casa en 1000m2 MEDALLO",
        description: "hermosa casa en medellin",
        guests: 6,
        rooms: 3,
        beds: 3,
        bathrooms: 4.5,
        price: 1536.00,
        hostId : 'e26278a2-3b57-4774-b35d-7a5da5a8febc',
        score: 0.00,
        placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
        comision: 150.00
    }])

    await Reservations.create({
        id: "a225462d-f8aa-470b-a2de-8960ca7c0edf",
        userId: "db0ef382-7cd9-4f1b-946c-0c14cc11913c",
        arrival: "2022-09-12 09:08:13.756 -0500",
        departure: "2022-10-12 09:08:13.756 -0500",
        accommodationId: "53cc017d-49f2-4d92-841b-23efe9e6233e",
        adults: 2,
      })
    
      await Reservations.create({
        id: "26541c34-07fc-4ac4-a199-bf981523da19",
        userId: "645060d9-0d76-458c-8ed4-304024ddc303",
        arrival: "2022-10-09 11:07:14.356 -0500",
        departure: "2022-10-12 11:07:14.656 -0500",
        accommodationId: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
        adults: 4,
      }) 

}

exports.defaultData = defaultData