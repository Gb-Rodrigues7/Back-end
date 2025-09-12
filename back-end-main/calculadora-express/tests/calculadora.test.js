const request = require('supertest');
const app = require('../index');

describe('API Calculadora', () => {
  test('GET /calculadora/somar 2 + 3 = 5', async () => {
    const res = await request(app).get('/calculadora/somar').query({ numA: 2, numB: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('GET /calculadora/dividir por zero retorna 400', async () => {
    const res = await request(app).get('/calculadora/dividir').query({ numA: 2, numB: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('GET /calculadora/raizQuadrada de -1 retorna 400', async () => {
    const res = await request(app).get('/calculadora/raizQuadrada').query({ numA: -1 });
    expect(res.statusCode).toBe(400);
  });
});
