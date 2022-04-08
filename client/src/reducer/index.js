import {
  GET_POKEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATE,
  ORDER_BY_NAME,
  GET_NAME_POKEMONS,
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
      // console.log("stadopokes", state.todosPokemons[0].types[0]);
      // console.log("payload", action.payload);
      // console.log("todos los pokemons", state.todosPokemons);
      const allPokemons = state.pokemonSinFiltro;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.types?.includes(action.payload));
      console.log(statusFiltered);
      return {
        ...state,
        todosPokemons: statusFiltered,
      };
    //----3
    case FILTER_CREATE:
      console.log("-------FILTER_CREATE");

      const allPokemons2 = state.pokemonSinFiltro;
      const filterIndb = allPokemons2.filter((el) => el.inDb);
      const filterOutdb = allPokemons2.filter((el) => !el.inDb);

      const statusFiltered2 =
        action.payload === "All"
          ? allPokemons2
          : action.payload === "Create"
          ? filterIndb
          : filterOutdb;
      console.log(statusFiltered2);
      return {
        ...state,
        todosPokemons: statusFiltered2,
      };
    //----4
    case ORDER_BY_NAME:
      console.log("-------orden k");
      let arrayOrdened =
        action.payload === "Asc"
          ? state.todosPokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              } else if (a.name < b.name) {
                return -1;
              } else return 0;
            })
          : state.todosPokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              } else if (a.name < b.name) {
                return 1;
              } else return 0;
            });
      console.log("arrayOrdened", arrayOrdened);
      return {
        ...state,
        todosPokemons: arrayOrdened,
      };
    //----5
    case GET_NAME_POKEMONS:
      return { ...state, todosPokemons: action.payload };
    default:
      return state;

    //----3
    //----4
  }
  //---------
}
export default rootReducer;
