// jest.mock('./http'); // mocking http call with a promise

const { loadTitle } = require('./utils');

test('should print an uppercase text', () => {
    loadTitle().then(title => {
        expect(title).toBe('DELECTUS AUT AUTEM')
    })
})