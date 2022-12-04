const server = require('../server/server.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('User Endpoints', () => {

  // it('GET /convert convert ifc to dae', async () => {
  //   const res = await requestWithSupertest.get('/hello');
  //   expect(res.status).toEqual(200);

  // });


  it('POST /convert convert ifc to dae', async () => {
    const res = await requestWithSupertest.post('/convert').send({ options: [], file: "haus.ifc", outputFile: "haus.dae" });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('file')
  });

  it('POST /convert convert null', async () => {
    const res = await requestWithSupertest.post('/convert').send({ options: [], file: "", outputFile: "haus.dae" });
    expect(res.status).toEqual(500);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('POST /convert convert null', async () => {
    const res = await requestWithSupertest.post('/convert').send({ options: null, file: null, outputFile: "haus.dae" });
    expect(res.status).toEqual(500);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('get /download file', async () => {
    const res = await requestWithSupertest.get('/download').query({ file: 'haus.ifc' });
    expect(res.status).toEqual(200);
  });

  it('get /download file null', async () => {
    const res = await requestWithSupertest.get('/download').query({ file: null });
    expect(res.status).toEqual(404);
  });

  it('get /download file blank', async () => {
    const res = await requestWithSupertest.get('/download').query({ file: '' });
    expect(res.status).toEqual(404);
  });

  // it('POST /upload file', async () => {
  //   const res = await requestWithSupertest.post('/upload').attach('file', './tests/haus.ifc')
  //   expect(res.status).toEqual(200);
  //   // expect(res.type).toEqual(expect.stringContaining('json'));
  // });


});


afterAll(done => {
  server.close();
  done();
});
