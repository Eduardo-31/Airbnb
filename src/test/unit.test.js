const { assert } = require("chai")
const { describe, it } = require("mocha")
const userControllers = require("../users/users.controllers")

//console.log(sum(6,2))


describe('Test Unitario de mis usuarios', () => {
    it('Should return new user when I sent correct data', (done) => {
        const body = {
            first_name: 'Usuario de test',
            last_name: 'tester',
            email: 'test@academlo.com' ,
            password: '1234',
            phone: '+51 424245333',
            birthday_date: '22/10/2000',
            country:'peru'
        }
        const data = userControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.last_name, body.last_name)
        assert.equal(data.email,body.email)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })
    it('Should return new user when I sent correct data with optional inputs', (done) => {
        const body = {
            first_name: 'Usuario de test',
            last_name: 'tester',
            email: 'test@academlo.com' ,
            password: '1234',
            phone: '+51 424245333',
            birthday_date: '22/10/2000',
            profile_image: 'asd',
            country:'peru'
        }
        const data = userControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.last_name, body.last_name)
        assert.equal(data.email,body.email)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, 'asd')
        assert.typeOf(data.id, 'string')
        assert.property(data, 'is_active')
        done()
    })
    it('Should return the user when I sent a correct ID', (done) => {
        const id = '9570e777-e6ce-4696-99b4-3bf5917a793a'
        const data = userControllers.getUserById(id)
        assert.property(data, 'id')
        assert.property(data, 'email')
        assert.property(data, 'rol')
        assert.property(data, 'first_name')
        assert.property(data, 'last_name')
        assert.equal(data.rol, 'admin')
        assert.equal(data.email, 'example@example.com')
        assert.property(data, 'is_active')
        assert.equal(data.is_active, true)
        assert.typeOf(data.is_active,'boolean')
        done()
    })
    it('Should return new user when I sent correct data with optional inputs', (done) => {
        const id = '9570e777-e6ce-4696-99b4-3bf5917a793a'
        const data = userControllers.deleteUser(id)
        assert.equal(data, true)
        assert.notEqual(data, false)
        assert.typeOf(data, 'boolean')
        done()
    })
    it('Should return new user when I sent correct data with optional inputs', (done) => {
        const id = '1'
        const data = userControllers.deleteUser(id)
        assert.equal(data, false)
        assert.notEqual(data, true)
        assert.typeOf(data, 'boolean')
        done()
    })
    it('Should return the user when I sent a correct ID', (done) => {
        const id = '40729f3c-f8a0-4548-a82a-fda792aabeb6'
        const data = userControllers.getUserById(id)
        assert.property(data, 'id')
        assert.property(data, 'email')
        assert.property(data, 'rol')
        assert.property(data, 'first_name')
        assert.property(data, 'last_name')
        assert.equal(data.rol, 'normal')
        assert.equal(data.email, 'eduardo@example.com')
        assert.property(data, 'is_active')
        assert.equal(data.is_active, true)
        assert.typeOf(data.is_active,'boolean')
        done()
    })
    it('Should return an error when I sent an invalid ID', (done) => {
        const id = '2'
        const data = userControllers.getUserById(id)
        assert.equal(data, false)
        assert.typeOf(data,'boolean')
        done()
    })
})
