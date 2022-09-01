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
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: new Date('January 4, 2028')
    };

    const completeLaunchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f'
    };

    it('should respond with 200 success status', async () => {
        const reponse = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(reponse.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(reponse.body).toMatchObject(completeLaunchDataWithoutDate)
    })

    it('should catch missing required properties', async () => {
        const reponse = await request(app)
            .post('/launches')
            .send(completeLaunchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(reponse.body).toStrictEqual({error: "Missing required launch property"})
    })

    it('should catch invalid dates', async () => {
        const reponse = await request(app)
            .post('/launches')
            .send({...completeLaunchDataWithoutDate, launchDate: 'test'})
            .expect('Content-Type', /json/)
            .expect(400);

        expect(reponse.body).toStrictEqual({error: "Invalid launch date"})
    })
})