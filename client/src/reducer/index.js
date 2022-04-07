import {
  GET_POKEMONS,
  FILTER_BY_TYPE,
  AGREGAR_A_FAVORITOS,
  ELIMINAR_DE_FAVORITOS,
  DETALLE_PELICULA,
} from "../actions/index.js";
const initialState = {
  todosPokemons: [],
  pokemonSinFiltro: [],
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
        pokemonSinFiltro: action.payload,
      };
    //----2
    case FILTER_BY_TYPE:
      console.log("stadopokes", state.todosPokemons[0].types[0]);
      console.log("payload", action.payload);
      console.log("todos los pokemons", state.todosPokemons);

      const allPokemonsTypes = state.pokemonSinFiltro;

      const statusFiltered =
        action.payload === "All"
          ? allPokemonsTypes
          : allPokemonsTypes.filter((el) => el.types?.includes(action.payload));
      console.log(statusFiltered);
      return {
        ...state,
        todosPokemons: statusFiltered,
      };

    default:
      return state;

    //----3
    //----4
  }
  //---------
}
export default rootReducer;
