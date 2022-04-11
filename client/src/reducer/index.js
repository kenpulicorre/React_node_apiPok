import {
  GET_POKEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATE,
  ORDER_BY_NAME,
  GET_NAME_POKEMONS,
  GET_TYPES,
  GET_DETAIL,
  POST_POKEMON,
  ORDER_BY_FUERZA,
  DETALLE_RESTAURAR,
  GET_DELETE_NAME_POKEMONS,
} from "../actions/index.js";
const initialState = {
  todosPokemons: [],
  pokemonSinFiltro: [],
  types: [],
  detalle: [],
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
          : allPokemons.filter((el) => {
              if (el.inDb) {
                let ar = el.types.map((el) => el.name);
                console.log("el.types.name s---", ar);

                return ar?.includes(action.payload);
              } else {
                console.log("el.typess---", el.types);
                return el.types?.includes(action.payload);
              }

              return el.types?.includes(action.payload);
            });
      console.log("filtro es:", statusFiltered);
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
    //----6
    case GET_TYPES:
      return { ...state, types: action.payload };
    //----7
    case POST_POKEMON:
      return { ...state };

    //-----8
    case GET_DETAIL:
      return {
        ...state,
        detalle: action.payload,
      };

    //--9

    case ORDER_BY_FUERZA:
      console.log("-------orden FUERZA");
      const allPokemons3 = state.pokemonSinFiltro;

      let arrayOrdened2 =
        action.payload === "All"
          ? allPokemons3
          : action.payload === "alta"
          ? state.todosPokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return 1;
              } else if (a.attack < b.attack) {
                return -1;
              } else return 0;
            })
          : state.todosPokemons.sort((a, b) => {
              if (a.attack > b.attack) {
                return -1;
              } else if (a.attack < b.attack) {
                return 1;
              } else return 0;
            });
      console.log("arrayOrdened", arrayOrdened2);
      return {
        ...state,
        todosPokemons: arrayOrdened2,
      };
    //--10
    case DETALLE_RESTAURAR:
      return {
        ...state,
        detalle: {},
      };
    //--11
    //----12
    //   case GET_DELETE_NAME_POKEMONS:
    //     return { ...state, todosPokemons: action.payload };
    default:
      return state;
  }
  //---------
}
export default rootReducer;
