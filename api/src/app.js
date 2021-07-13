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

//******************************************************************************************************************/
//----------------------GET VIDEOGAMES o VIDEOGAMES?search=nombre -------------------------------------------------//
//*****************************************************************************************************************/
server.get("/videogames" , async (req, res) => {                           
  const { search } = req.query;
// PUEDE VENIR POR QUERY ?search={name}           
  if(search){                                                                     
    let AllSearchGames = [];                                             
    const dbgameSearch = await Videogame.findAll({
      where: { name: search.toLowerCase() }, 
    })
    let apigameSearch = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&search=${search}`)
    apigameSearch = apigameSearch.data.results.map((apiex) =>{
      return {
        id: apiex.id,
        name: apiex.name,
        img: apiex.background_image,
        rating: apiex.rating,
        platforms: apiex.platforms,
        genres: apiex.genres.map(e => e.name).join(),
      }
    })
    AllSearchGames = dbgameSearch.concat(apigameSearch);
    return res.json(AllSearchGames);


// SI NO TRAE SEARCH TRAIGO LA LISTA DE LA DB y DE LA API EXTERNA    
  }else{                                                                          
   let AllGames;
   const dbgames = await Videogame.findAll();                                                                                        
   let allApigame = [];
   let nextPage, games;
    for (let i=0; i<5; i++){
      if(i === 0){
        games = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}`);            //Guardo en games el LOS PRIMEROS 20
        nextPage = games.data.next;                                                        //Guardo en next la url para la segunda pagina 
      }else{
        games = await axios.get(nextPage);                                                 //Guardo en games los SIGUIENTES 20
        nextPage = games.data.next;                                                        //Guardo en next las sig url    
      }

      games = games.data.results.map((api) => {                                           //Guardo solamente lo que voy a usar 
        return {
          id: api.id,
          name: api.name,
          img: api.background_image,
          rating: api.rating,
          platforms: api.platforms,
          genres: api.genres.map(e => e.name).join(),
        }  
      }); 
      allApigame = allApigame.concat(games);                                                //Concateno mi arreglo vacio con los juegos de la api
    }
  AllGames = dbgames.concat(allApigame);                                                    //Concateno los juegos de mi DB con los de la API
  return res.json(AllGames);
  }
});

//****************************************************************************************************************************/
//                                    POST VIDEOGAME                                                                        //  
//**************************************************************************************************************************/
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

//**************************************************************************************************************************/
//                                    GET VIDEOGAME/:ID                                                                    //
//**************************************************************************************************************************/
server.get("/videogame/:id", (req, res) => {
  const {id} = req.params;
  if(id.length < 6){
    return axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`)                 // PARA INGRESAR AL ID api.rawg.io/api/games/id?key=...
    .then(response => res.json(response.data))
    .catch(err => res.send(err));
  }else{
    Videogame.findByPk(id)
    .then((result) => { 
      return res.json(result) })
    .catch(err => res.send(err));  
  }
});
//****************************************************************************************************************************/
//-------------------------------GET GENRES---------------------------------------------------------------------------------//
//**************************************************************************************************************************/
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
