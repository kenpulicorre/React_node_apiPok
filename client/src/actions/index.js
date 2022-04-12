const axios = require("axios");
// import axios from "axios";
export const GET_POKEMONS = "getPokemons";
export const FILTER_BY_TYPE = "FilterPokesBytype";
export const FILTER_CREATE = "FilterPokesCreated";
export const ORDER_BY_NAME = "orderByName"; //ORDEN ALFABETICO
export const GET_NAME_POKEMONS = "getNamePokemons"; //QUERY
export const GET_TYPES = "getTypes";
export const POST_POKEMON = "postPokemon";
export const GET_DETAIL = "getDetallePoke"; //BY iD PARAMS
export const ORDER_BY_FUERZA = "orderByFuerza";
export const DETALLE_RESTAURAR = "restartDetalle";
export const GET_DELETE_NAME_POKEMONS = "getDeleteNamePokemons";

//--
export function FilterPokesBytype(params) {
  console.log("----FilterPokesBytype Ok!");
  return {
    type: FILTER_BY_TYPE,
    payload: params,
  };
}
//--
//--
export function FilterPokesCreated(params) {
  console.log("----FilterPokesCreated Ok!");
  return {
    type: FILTER_CREATE,
    payload: params,
  };
}
//--
//--
export function orderByName(params) {
  console.log("----orderByName Ok!");
  return {
    type: ORDER_BY_NAME,
    payload: params,
  };
}
//--
//--
export function orderByFuerza(params) {
  console.log("----orderByFuerza Ok!");

  return {
    type: ORDER_BY_FUERZA,
    payload: params,
  };
}
//--
//--
export function restartDetalle(params) {
  console.log("----restartDetalle Ok!");

  return {
    type: DETALLE_RESTAURAR,
    payload: params,
  };
}
//--
//--
export function getNamePokemons(payload) {
  console.log("----getNamePokemons Ok!");

  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/pokemons?name=" + payload
      );
      return dispatch({
        type: GET_NAME_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      alert("no hay pokemon");
      console.log(error);
    }
  };
}
//--
//--
export function getTypes(params) {
  console.log("----getTypes Ok!");
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    } catch (error) {
      alert("no tipos");
      console.log(error);
    }
  };
}
//--
//--

export function getDetallePoke(id) {
  console.log("----getDetallePoke Ok!");
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/pokemons/" + id);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function xx(params) {}
//--
//--
export function postPokemon(params) {
  console.log("----postPokemon Ok!");
  return async function (dispatch) {
    try {
      const json = await axios.post("http://localhost:3001/pokemons", params);
      console.log(json);
      //return json
      return dispatch({
        type: POST_POKEMON,
        payload: json,
      });
    } catch (error) {
      alert("no pokes");
      console.log(error);
    }
  };
}
//---
// export function getDeleteNamePokemons(payload) {
//   console.log("----getNamePokemons Ok!");

//   return async function (dispatch) {
//     try {
//       const json = await axios.get(
//         "http://localhost:3001/pokemons?name=" + payload
//       );
//       return dispatch({
//         type: GET_DELETE_NAME_POKEMONS,
//         payload: json.data,
//       });
//     } catch (error) {
//       alert("no hay pokemon");
//       console.log(error);
//     }
//   };
// }
//---
//--

export default function getPokemons() {
  console.log("----getPokemons Ok!");
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons`, {});
      console.log("POKEMONES,", json);
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      alert("Falla en obtencion de pokemon");
      console.log(error);
    }
  };
}
