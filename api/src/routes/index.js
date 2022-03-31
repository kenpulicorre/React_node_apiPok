const { Router } = require("express");
const router = Router();
const axios = require("axios");
const urlEnd = `http://pokeapi.co/api/v2/pokemon`;
//const urlEnd = `https://breakingbadapi.com/api/characters`;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require("../db");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//---funciones

//-------traer lo de la api-----

const getApiInfoPokemon = async () => {
  let arrDataPoke = [];
  let arrPokemons = [];

  try {
    //---solo 20------
    const pokemonApi = await axios.get(urlEnd); //para apinfo
    const apiInfo = await pokemonApi.data.results.map((e) => {
      //no une los 40
      //const apiInfo = await pokemonApi.data.map((e) => {
      return {
        url: e.url,
        name: e.name,
        img: e.img,
      };
    });
    //---fin solo 20------
    //-------para 40---------
    let n = 0;
    let n2 = 0;
    let poke = 40;
    let nf = poke / 20 - 1;
    // let urlEndnext = await pokemonApi.data.next;
    let urlEndnext = urlEnd;
    const apiInfoT = [];
    while (n < poke / 20) {
      const pokemonApiSig = await axios.get(urlEndnext);
      const apiInfoSig = await pokemonApiSig.data.results.map((e) => {
        return {
          url: e.url,
          name: e.name,
          img: e.img,
        };
      });
      apiInfoT.push(apiInfoSig);
      n++;
      urlEndnext = await pokemonApiSig.data.next;
    }
    while (n2 < nf) {
      var res = apiInfoT[n2].concat(apiInfoT[n2 + 1]);
      n2++;
    }

    //-------fin para 40---------

    // return apiInfo;
    // return apiInfoT;
    return res;
    //return apiInfoSig;
  } catch (error) {}
};
//-------fin traer lo de la api-----
//-------traer lo de la base de datos-----
const getDbInfoPokemon = async () => {
  const arrInfo = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return arrInfo;
};
//-------fin traer lo de la base de datos-----

//-------unir lo del api y la base de datos-----
const getAllInfoPokemon = async () => {
  const apiPoke = await getApiInfoPokemon();
  // console.log("llam funcion oki", apiPoke);
  const dbPoke = await getDbInfoPokemon();
  // const totalPoke = apiPoke.concat(dbPoke);
  const totalPoke = apiPoke;

  return totalPoke;
};
//-------fin unir lo del api y la base de datos-----

//fin de funcions

//definiendo rutas iniciales sin modulizar aun
router.get("/pokemon", async (req, res) => {
  // const { name } = req.query;
  const name = req.query.name;
  let pokeTotal = await getAllInfoPokemon();
  if (name) {
    let pokeName = await pokeTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    pokeName.length
      ? res.status(200).send(pokeName)
      : res.status(404).send("no esta el pokemon");
  } else {
    // res.status(200).send(pokeTotal);
    res.status(200).send(pokeTotal);
  }
});
//inf de rutas

module.exports = router;
