const axios = require("axios");
// import axios from "axios";
export const GET_POKEMONS = "getPokemons";
export const FILTER_BY_TYPE = "FilterPokesBytype";
export const FILTER_CREATE = "FilterPokesCreated";
export const ORDER_BY_NAME = "orderByName";
export const GET_NAME_POKEMONS = "getNamePokemons";
export const GET_TYPES = "getTypes";
export const POST_POKEMON = "postPokemon";
export const GET_DETAIL = "getDetallePoke";

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
//--
export function getNamePokemons(payload) {
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
//9-04 10pm
export function getDetallePoke(id) {
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
