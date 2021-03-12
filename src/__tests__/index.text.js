const request = require('supertest');
const createServer = require('../server');
let app;

beforeAll(() => {
    app = createServer('../mockData/content');
});

afterAll(() => {
    app.close();
});

describe('GET 200 on valid request', () => {
    it('responds with 200', (done) => {
        request(app).get('/test-page').expect(200, done);
    });
});

describe('GET 404 on invalid request', () => {
    it('responds with 404', (done) => {
        request(app).get('/invalid').expect(404, done);
    });
});

describe('GET /test-page', () => {
    it('responds with proper content', (done) => {
        request(app).get('/test-page').expect(hasExpectedBody).end(done);
    });
});

function hasExpectedBody(res) {
    const ParsedMdTestContent = '<h1 id="test">Test</h1>'; // TODO replace by parsed test md file
    if (!res.text.includes(ParsedMdTestContent))
        throw new Error('missing content');
}
