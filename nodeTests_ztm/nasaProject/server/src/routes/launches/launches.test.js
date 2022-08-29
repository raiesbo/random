const request = require('supertest');
const app = require('../../app');

describe('Test Get /launches', () => {
    it('should respond with 200 success status', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    })
})

describe('Test POST /launches', () => {
    it('should respond with 200 success status', async () => {
        // const response = request(app);
        // expect(response).toEqual(200);
    })

    it('should catch missing required properties', async () => {

    })

    it('should catch invalid dates', async () => {
        
    })
})