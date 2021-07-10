const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { default: axios } = require('axios');
const  DB_KEY  = "6fc12debd6e24ec99e67faba047213f4";
const { v4: uuidv4 } = require('uuid');

const { Videogame, Genre } = require('./db.js');
/* const Genre = require('./models/Genre.js'); */

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


// PUEDE VENIR INFO EN QUERY
server.get("/videogames" , (req, res) => {                   // PUEDE VENIR POR QUERY ?search={name}             
  const { search } = req.query; 
 /*  console.log(search); */
  if(search){                                               // FILTRO POR NOMBRE
    const dbgameSearch = Videogame.findAll({
      where: { name: search.toLowerCase() }, 
    })
    const apigameSearch = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&search=${search}`) // PARA BUSCAR POR NOMBRE api.rawg.io/api/games?key=...&search=NOMBRE
 
    /* .then(response => console.log(JSON.stringify(response.data))) */
    Promise.all([dbgameSearch, apigameSearch])
    .then((result) => {
      const [dbsearchResult, apisearchResult] = result;                                
      let response = dbsearchResult.concat(apisearchResult.data.results);
      return res.json(response);
      
      /* if(dbsearchResult){                               //EN EL CASO DE QUE EL JUEGO ESTE EN LA DB
        let response = dbsearchResult
        return res.json(response);
      
      }else if(apisearchResult){                       //EN EL CASO DE QUE EL JUEGO ESTE EN LA API
        let response = apisearchResult;
        return res.json(response.data.results);
      } */
    })
    .catch(err => res.send(err));

  }else{                                                              
    const dbgames = Videogame.findAll();                                             // SI NO TRAE SEARCH TRAIGO LA LISTA DE LA DB y DE LA API EXTERNA 
    const apigames = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}`)
    Promise.all([dbgames, apigames])
    .then((result) => {
      const [mygameResult, apigameResult] = result;
      const response = mygameResult.concat(apigameResult.data.results);
      return res.json(response);
    })
    .catch(err => res.send(err));
  }  
});

server.post("/videogame", (req,res) => {
  const newgame = req.body;
  return Videogame.create({
    ...newgame,
    name: newgame.name.toLowerCase(),
    id: uuidv4(),
  })
  .then(response => res.json(response))
  .catch(err => res.send(err))
});

server.get("/videogame/:id", (req, res) => {
  const {id} = req.params;
  if(id.length < 6){
    return axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`)     // PARA INGRESAR AL ID api.rawg.io/api/games/id?key=...
    .then(response => res.json(response.data))
    .catch(err => res.send(err));
  }else{
    Videogame.findByPk(id)
    .then((result) => { 
      return res.json(result) })
    .catch(err => res.send(err));  
  }
});

server.get("/genres", (req, res) => {
  axios.get(`https://api.rawg.io/api/genres?key=${DB_KEY}`)
  .then((response) => {
    const generos = response.data.results;
    generos.forEach(e => {
      Genre.create({
        name: e.name,
        id: e.id,
      })
    })
    return res.json(generos);
  })
});


module.exports = server;
