const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const {settings, dbURI} = require('../../config/db');
const User = require('../../models/User');
const faker = require('faker');


describe('some initial tests for user', () => {
    //global variables that we can use in all tests
    let randomUser, registerResponse, connection;

    beforeAll(async done =>{
        //waiting for connection with mongoDB database
        connection = await mongoose.connect(dbURI, settings);
        done()
    });
    test('should create new user', async () => {
        //create user with random properties.
        const userToRegister = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const response = await request(app).post('/api/users/register')
            .type('form')
            .send({...userToRegister})
            .set('Accept', 'application/json');
        expect(response.body.msg).toContain('registered');
        expect(response.body.token).toContain('Bearer');

        const user = await User.findOne({email: userToRegister.email});
        expect(user).toHaveProperty('firstName',userToRegister.firstName);
        expect(user).toHaveProperty('lastName',userToRegister.lastName);
        expect(user).toHaveProperty('email',userToRegister.email);
        expect(user).toHaveProperty('emailVerified',false)

    });
    describe('create one random user for all future tests', () => {
        // EVERY TEST HERE WILL OPERATE ON SAME USER!
        beforeAll(async done => {
            randomUser = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            registerResponse = await request(app).post('/api/users/register')
                .type('form')
                .send({...randomUser})
                .set('Accept', 'application/json');
            done()
        });

        test('user should be able to login', async () => {
            const {email, password} = randomUser;
            const response = await request(app).post('/api/users/login')
                .type('form')
                .send({email, password})
                .set('Accept', 'application/json');
            expect(response.body.msg).toContain('logged in');
            expect(response.body.token).toContain('Bearer');
        });

        test('user should not be able to update data when he have not confirmed email', async () => {
            const response = await request(app).put('/api/users/')
                .set('Authorization', registerResponse.body.token )
                .type('form')
                .send({
                    firstName: "randomName"
                });
            expect(response.body.msg).toContain("not verified")
        })
    });
    afterAll(async done => {
        await connection.disconnect();
        done()
    })
});