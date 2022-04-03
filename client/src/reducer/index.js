import {
  GET_POKEMONS,
  AGREGAR_A_FAVORITOS,
  ELIMINAR_DE_FAVORITOS,
  DETALLE_PELICULA,
} from "../actions/index.js";
const initialState = {
  todosPokemons: [],
  peliculasFavoritas: [],
  pelicula: {},
  // amigosArray=[{name: apellido:}]
  //
};
function rootReducer(state = initialState, action) {
  //---------
  switch (action.type) {
    //----1
    case GET_POKEMONS:
      return {
        ...state,
        todosPokemons: action.payload,
      };
    //----2
    //----3
    //----4
  }
  //---------
}
export default rootReducer;
