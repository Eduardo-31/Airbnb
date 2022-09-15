const chai = require('chai')
const { it, describe } = require('mocha')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

describe('Suite de test de integracion de Usuarios', () => {

    it('Should', (done) => {
        chai.request(app)
        .get('/api/v1/users/9570e777-e6ce-4696-99b4-3bf5917a793a')
        .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1NzBlNzc3LWU2Y2UtNDY5Ni05OWI0LTNiZjU5MTdhNzkzYSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNjYxNTc3NzAxfQ.KvvcOEiSHDT48z5sUqDqgw2ryyQ6NwvVgvvqwTLGPXY')
        .end((err, res) => {
            chai.assert.equal(res.status, 200)
            chai.assert.property(res.body, 'id')
            chai.assert.property(res.body, 'email')
            chai.assert.property(res.body, 'rol')
            chai.assert.equal(res.body.rol, 'admin')
            chai.assert.equal(res.body.email, 'example@example.com')
            done()
        })
    })

    it('Should return 204 when I delete my own user with my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1NzBlNzc3LWU2Y2UtNDY5Ni05OWI0LTNiZjU5MTdhNzkzYSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNjYxNTc3NzAxfQ.KvvcOEiSHDT48z5sUqDqgw2ryyQ6NwvVgvvqwTLGPXY')
            .end((err,res) => {
                chai.assert.equal(res.status, 204)
                done()
            })
    })
    it('Should return 200 when I delete my own user with my credentials', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .end((err,res) => {
                chai.assert.equal(res.status, 200)
                done()
            })
    })
    
})