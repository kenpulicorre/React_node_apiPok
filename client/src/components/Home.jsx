import React, { Fragment } from "react";
//hoooks
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import estilos from "./Home.module.css";
import Paginado from "./Paginado";
//acciones
import {
  FilterPokesBytype,
  FilterPokesCreated,
  orderByName,
  getTypes,
  orderByFuerza,
  restartDetalle,
} from "../actions/index.js";
import getPokemons from "../actions/index";
import { xx } from "../actions/index";

//componentes
import Card from "./Card";
import SearchBar from "./SearchBar";
import CreateForm from "./CreateForm";
import Loader from "./Loader";
//-----------------------------------------
var señal;
export default function Home(params) {
  //----hook iniciales---------
  xx();
  const dispatch = useDispatch(); //mapdispatchtoprops
  const allPokemons = useSelector((state) => state.todosPokemons); //mapstatetoprops
  const allTypes = useSelector((state) => state.types);
  const [order, setOrder] = useState("");
  //------------------pokesToPage-----
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePage, setPokePage] = useState(12);
  const endPoke = currentPage * pokePage;
  const iniPoke = endPoke - pokePage;
  const pokesToPage = allPokemons.slice(iniPoke, endPoke);

  const setPaginado = (nPage) => {
    setCurrentPage(nPage);
  };

  //------------------fin pokesToPage-----

  //cuando el componente se monta traer pokes
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    dispatch(restartDetalle());
    señal = true;
    console.log("señallllllllllllllllllllllllllll\n", señal);
  }, [dispatch]); //[] =1sola vez,[state]=cada state ejecuta

  //----fin hook iniciales---------
  //----funciones-----------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    alert("Se cargara pokemones");
  }
  //---
  function handleFilterType(params) {
    dispatch(FilterPokesBytype(params.target.value));
    if (allPokemons.length > 1) {
      señal = false;
    }
  }
  //---
  function handleFilterCreated(params) {
    dispatch(FilterPokesCreated(params.target.value));
    if (allPokemons.length > 1) {
      señal = false;
    }
  }

  //---
  //---
  function handleOrder(params) {
    params.preventDefault();
    dispatch(orderByName(params.target.value));
    setCurrentPage(1);
    //setOrder(`actualiza estado local`);
    setOrder(`ordenado ${params.target.value}`);
    if (allPokemons.length > 1) {
      señal = false;
    }
  }
  //
  function handleFuerza(params) {
    params.preventDefault();
    dispatch(orderByFuerza(params.target.value));
    setOrder(`actualizar estado local ${params.target.value}`);
    if (allPokemons.length > 1) {
      señal = false;
    }
  }

  //----fin funciones--------------

  //
  // if (allPokemons.length < 1) {
  //   return <Loader />;
  // }
  if (allPokemons.length < 1 && señal == true) {
    return <Loader />;
  }
  return (
    <div className={estilos.contenedor}>
      <h1 className={estilos.title}>¡MANIFIESTA TU POKEMON!</h1>
      <div className={estilos.selector}>
        <p className={estilos.selector2}>
          <Link to="/pokemon" className={estilos.crear_poke}>
            Crea tu Pokemon
          </Link>

          <button
            onClick={(e) => handleClick(e)}
            className={estilos.crear_poke}
          >
            Recargar pokemons
          </button>
        </p>
        {/* lalmado componente search */}
        <p>
          <SearchBar />
        </p>
      </div>

      {/* filtros------------------------- */}
      <div className={estilos.Contenedor_filtro}>
        {/* ascendentemente como descendentemente */}
        <select
          name=""
          id=""
          onChange={(e) => handleOrder(e)}
          className={estilos.select}
        >
          <option value="Asc">Ascendente</option>
          <option value="Desc">Descenden</option>
        </select>

        {/* Botones/Opciones para filtrar por tipo de pokemon */}
        <select
          name=""
          id=""
          onChange={(e) => handleFilterType(e)}
          className={estilos.select}
        >
          <option value="All">Todos</option>
          {/* <option value="normal">Normal</option>
          <option value="poison">poison</option>
          <option value="flying">flying</option>
          <option value="fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Electric">Elect</option>
          <option value="All">Todos</option> */}
          {allTypes?.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          ))}

          {allTypes?.map((e) => {
            console.log("todos los tipos son---- ", e.name);
            //(
            //   <option key={e.id} value={e.name}>
            //     {e.name}
            //   </option>
            // );
          })}
        </select>

        {/* filtro todos, existente creado */}
        <select
          name=""
          id=""
          onChange={(e) => handleFilterCreated(e)}
          className={estilos.select}
        >
          <option value="All">Todos</option>
          <option value="Create">Creados</option>
          <option value="ExistenteApi">Existente</option>
        </select>

        {/* filtro fuerza */}
        <select
          name=""
          id=""
          onChange={(e) => handleFuerza(e)}
          className={estilos.select}
        >
          <option value="All">Fuerza</option>
          <option value="alta">Fuerza ascendente</option>
          <option value="baja">Fuerza Descendente</option>
        </select>
        {/* fin filtros-------------------------
       --------------------------------------  */}

        {/* llamando al componente Paginado */}
        <Paginado
          pokePage={pokePage}
          allPokemons={allPokemons.length}
          setPaginado={setPaginado}
        />

        {/* <CreateForm /> */}
        {/* llamando al componente card----- */}
        {pokesToPage?.map((el) => {
          return (
            <Fragment key={el.id}>
              <Link to={"/home/" + el.id}>
                <Card
                  // key={el.id}
                  id={el.id}
                  name={el.name}
                  image={el.img}
                  type={el.types}
                  inDb={el.inDb ? el.inDb : false}
                />
              </Link>
            </Fragment>
          );
        })}
        {/* llamando al componente card----- */}
      </div>
    </div>
  );
}
