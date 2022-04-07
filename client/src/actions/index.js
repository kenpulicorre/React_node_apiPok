const axios = require("axios");
// import axios from "axios";
export const GET_POKEMONS = "getPokemons";
export const FILTER_BY_TYPE = "FilterPokesBytype";
export const FILTER_CREATE = "FilterPokesCreated";
export const ORDER_BY_NAME = "orderByName";



//--
export function FilterPokesBytype(params) {
  return {
    type: FILTER_BY_TYPE,
    payload: params,
  };
}
//--
//--
export function FilterPokesCreated(params) {
  return {
    type: FILTER_CREATE,
    payload: params,
  };
}
//--
//--
export function orderByName(params) {
  return {
    type: ORDER_BY_NAME,
    payload: params,
  };
}
//--
export function xx(params) {}
//--

export default function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/pokemons`, {});
    console.log("POKEMONES,", json);
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}
