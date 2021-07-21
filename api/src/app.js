const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { default: axios } = require('axios');
const  DB_KEY  = "6fc12debd6e24ec99e67faba047213f4";
const { v4: uuidv4 } = require('uuid');

const { Videogame, Genre } = require('./db.js');
const db = require('./db.js');
const e = require('express');


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
  let AllGames;
  const dbgames = await Videogame.findAll({ include: [
    { model: Genre, attributes: ["name"], through: { attributes: [] } }
  ]
});
                                                                                     
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

      games = games.data.results.map((api) => {                                      //Guardo solamente lo que voy a usar 
        return {
          id: api.id,
          name: api.name,
          img: api.background_image,
          rating: api.rating,
          platforms: api.platforms,
          genres: api.genres.map(genr => {
            return {name: genr.name}
          }),
        }  
      }); 
      allApigame = allApigame.concat(games);                                                //Concateno mi arreglo vacio con los juegos de la api
    }
  AllGames = dbgames.concat(allApigame);                                                    //Concateno los juegos de mi DB con los de la API

// PUEDE VENIR POR QUERY ?search={name}           
  if(search){                                                                     
    let AllSearchGames = [];                                             
    const dbgameSearch = await Videogame.findAll({
      where: { name: search.toLowerCase() }, 
      include: [
        { model: Genre, attributes: ["name"], through: { attributes: [] } }
      ]
    })
    let apigameSearch = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&search=${search}`)
    apigameSearch = apigameSearch.data.results.map((apiex) =>{
      return {
        id: apiex.id,
        name: apiex.name,
        img: apiex.background_image,
        rating: apiex.rating,
        platforms: apiex.platforms,
        genres: apiex.genres.map(e => {
          return {name: e.name}
        }),
      }
    })
    AllSearchGames = dbgameSearch.concat(apigameSearch);
    return res.json(AllSearchGames);


// SI NO TRAE SEARCH O ORDEN TRAIGO TODOS LOS JUEGOS DE MI LOCALHOST 
  }else{                                                                                                                            //Concateno los juegos de mi DB con los de la API
      return res.json(AllGames);
  }
});

//****************************************************************************************************************************/
//                                    POST VIDEOGAME                                                                        //  
//**************************************************************************************************************************/
server.post("/videogame", async(req,res,next) => {
  try{
    const newgame = req.body;
    console.log("ESTO ES EL NEWGAME: ", newgame);
    const genreid = newgame.genres;
    const idgame = uuidv4();
    const createGame = await Videogame.create({
      ...newgame,
      name: newgame.name.toLowerCase(),
      id: idgame,
    });
    for(let i=0; i<genreid.length; i++){
      Videogame.findByPk(idgame)
      .then((game) => {
        return game.addGenre(genreid[i]);
      })
    }
    const findgame = await Videogame.findByPk(idgame);
    return res.json(findgame);
  }catch(err){
    next(err);
  }
});

//**************************************************************************************************************************/
//                                    GET VIDEOGAME/:ID                                                                    //
//**************************************************************************************************************************/
server.get("/videogame/:id", async (req, res, next) => {
  const {id} = req.params;
  console.log(id);
  if(id.length < 6){
    try{
      const apigame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`);     // PARA INGRESAR AL ID api.rawg.io/api/games/id?key=...
      console.log(apigame.data);               
      const game = {
        name: apigame.data.name,
        description: apigame.data.description_raw,
        launchdate: apigame.data.released,
        rating: apigame.data.rating,
        plataforms: apigame.data.platforms.map((p) => p.platform.name).join(),
        img: apigame.data.background_image,
        genres: apigame.data.genres.map(e => {
          return {name: e.name}
        }),
      }
      return res.json(game);
    }catch(e){  
      next(e);
    }
  }else{
    try{
      const dbgame = await Videogame.findAll({
        where: { id : id }, 
        include: [
          { model: Genre, attributes: ["name"], through: { attributes: [] } }
        ]
      })
      console.log(dbgame);
      return res.json(dbgame[0]);
    }catch(e){
      next(e);
    } 
  }
});
//****************************************************************************************************************************/
//-------------------------------GET GENRES---------------------------------------------------------------------------------//
//**************************************************************************************************************************/
server.get("/genres", (req, res) => {
  axios.get(`https://api.rawg.io/api/genres?key=${DB_KEY}`)
  .then((response) => {
    const generos = response.data.results;
    generos.forEach(genre => {
      Genre.create({
        name: genre.name,
      })
    })
    Genre.findAll()
    .then(response => {
      return res.json(response);
    })
  })
  .catch(err => res.send(err));
});

server.get("/genres/db", async(req, res) => {
const dbgenres = await Genre.findAll();
return res.json(dbgenres);
})


module.exports = server;
