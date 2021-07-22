/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');


const agent = session(app);
const videogame = {
  id: uuidv4(),
  name: 'Super Mario Bros',
  description: "asdasdasdasda",
  plataforms: "PC",
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', (done) => {
      agent.get('/videogames').expect(200)
      done()
    });
  });
});
