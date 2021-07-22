const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if description is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ id: uuidv4() , name: 'Super Mario Bros', description: "Mario bros game...", plataforms: "Pc" })
          .catch((err) => console.log(err))
      });
    });
  });
});

