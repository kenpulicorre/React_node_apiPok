const { Router } = require("express");
const router = Router();
const axios = require("axios");
const urlEnd = `http://pokeapi.co/api/v2/pokemon`;
const urlEndT = ` https://pokeapi.co/api/v2/type`;

//const urlEnd = `https://breakingbadapi.com/api/characters`;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require("../db");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//---funciones

//-------traer pokemons lo de la api-----

const getApiInfoPokemon = async () => {
  let arrDataPoke = [];
  let arrPokemons = [];

  try {
    // //---solo 20------
    // const pokemonApi = await axios.get(urlEnd); //para apinfo
    // const apiInfo = await pokemonApi.data.results.map((e) => {
    //   //no une los 40
    //   //const apiInfo = await pokemonApi.data.map((e) => {

    //   return {
    //     url: e.url,
    //     name: e.name,
    //     img: e.img,
    //   };
    // });
    // //---fin solo 20------
    //-------para 40---------
    let n = 0;
    let n2 = 0;
    let poke = 40;
    let nf = poke / 20 - 1;
    let urlEndnext = urlEnd;
    const apiInfoT = [];
    while (n < poke / 20) {
      const pokemonApiSig = await axios.get(urlEndnext);
      const apiInfoSig = await pokemonApiSig.data.results.map((e) => {
        return { url: e.url, name: e.name };
      });
      apiInfoT.push(apiInfoSig);
      n++;
      urlEndnext = await pokemonApiSig.data.next;
    }
    while (n2 < nf) {
      var res = apiInfoT[n2].concat(apiInfoT[n2 + 1]);
      n2++;
    }
    //llamando datos de pokemons-------
    const apiInfoPoke = await res.map(async (d) => await axios.get(d.url));
    let apiInfoPokemonTotals = await Promise.all(apiInfoPoke).then((data) => {
      let pokeInfo = data.map((el) => {
        return {
          id: el.data.id,
          name: el.data.name,
          life: el.data.stats[0].base_stat,
          attack: el.data.stats[1].base_stat,
          defense: el.data.stats[2].base_stat,
          speed: el.data.stats[5].base_stat,
          height: el.data.height,
          weight: el.data.weight,
          img:
            el.data.sprites.other.home.front_default ||
            "http://misiontokyo.com/wp-content/uploads/2021/06/pc-ut-pokemon-all-stars-hero-1.jpg",
          types: el.data.types.map((el) => el.type.name),
        };
      });
      return pokeInfo;
    });
    //fin llamando datos de pokemons-------
    //-------fin para 40---------
    return apiInfoPokemonTotals;
  } catch (error) {}
};
//-------fin traer pokemons lo de la api-----
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
  const dbPoke = await getDbInfoPokemon();
  const totalPoke = apiPoke.concat(dbPoke);
  return totalPoke;
};
//-------fin unir lo del api y la base de datos-----

//fin de funcions

//definiendo rutas iniciales sin modulizar aun
//--------.get("/pokemon"--------
router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
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
//--------fin .get("/pokemon"--------
//--------.get("/pokemon/id"--------
router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  let pokeTotal = await getAllInfoPokemon();
  if (id) {
    let pokeId = await pokeTotal.filter((el) => el.id == id);
    console.log("id", id);
    console.log("pokestotales", pokeTotal);
    pokeId.length
      ? res.status(200).json(pokeId)
      : res.status(400).send("no se encuentra pokemon");
  }
});
//--------fin .get("/pokemon/id"--------

//--------.post("/pokemon"--------
router.post("/pokemons", async (req, res) => {
  const {
    name,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    types,
    inDb,
  } = req.body;
  console.log(name);

  let newPokemon = await Pokemon.create({
    name,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    inDb,
  });
  let typeDb = await Type.findAll({
    where: { name: types },
  });
  // if (typeDb.length === 0) {
  //   res.send("el typo no exieste, ");
  // } else {
  console.log(typeDb);
  newPokemon.addType(typeDb);
  res.send("pokemon creado correctmente");
  // }

  // res.send("Pokemon creado correctamente");
});
//--------.post("/pokemon"--------

//--------"/pokemon"--------

//----------/types------------------------------------
//-------funciones------------
//-------traer lo de la api-----
const getApiInfoTypes = async () => {
  try {
    const typeApi = await axios.get(urlEndT); //para apinfo
    const apiInfoType = await typeApi.data.results.map((e) => {
      // return {
      //   name: e.name,
      //   url: e.url,
      // };
      console.log(e.name);
      Type.findOrCreate({
        where: {
          name: e.name,
          // url: e.url,
        },
      });
    });
    // return apiInfoType;//esto devuelve la respuesta de la api
    return await Type.findAll(); //esto devuelve lo guardado en db
  } catch (error) {}
};
//-------fin traer lo de la api-----
//-------fin de funciones------------

router.get("/types", async (req, res) => {
  try {
    let typeTotal = await getApiInfoTypes();
    res.status(200).send(typeTotal);
  } catch (error) {
    res.status(error);
  }
});
//------------------------------------------
//----------/types------------------------------------

//inf de rutas

module.exports = router;
