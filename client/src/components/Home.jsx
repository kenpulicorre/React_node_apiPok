import React, { Fragment } from "react";
//hoooks
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import estilos from "./Home.module.css";
import Paginado from "./Paginado";
//acciones
import { FilterPokesBytype } from "../actions/index.js";
import getPokemons from "../actions/index";
import { xx } from "../actions/index";

//componentes
import Card from "./Card";
//-----------------------------------------

export default function Home(params) {
  //----hook iniciales---------
  xx();
  const dispatch = useDispatch(); //mapdispatchtoprops
  const allPokemons = useSelector((state) => state.todosPokemons); //mapstatetoprops

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
  }, [dispatch]); //[] =1sola vez,[state]=cada state ejecuta

  //----fin hook iniciales---------
  //----funciones-----------------
  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  //---
  function handleFilterStatus(params) {
    dispatch(FilterPokesBytype(params.target.value));
  }

  //----fin funciones--------------

  //

  return (
    <div>
      <Link to="/pokemon">Crea tu Pokemon</Link>
      <h1>¡MANIFIESTA TU POKEMON!</h1>
      <button onClick={(e) => handleClick(e)}>Recargar pokemons</button>
      {/* filtros------------------------- */}
      <div>
        <select name="" id="">
          {/* ascendentemente como descendentemente */}

          <option value="Asc">Ascendente</option>
          <option value="Desc">Descenden</option>
        </select>
        {/* Botones/Opciones para filtrar por tipo de pokemon */}
        <select name="" id="" onChange={(e) => handleFilterStatus(e)}>
          <option value="All">Todos</option>
          <option value="normal">Normal</option>
          <option value="poison">poison</option>
          <option value="flying">flying</option>
          <option value="fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Electric">Elect</option>
          <option value="All">Todos</option>

          {/* hhh {allTypes?.map((e)=>(
                        <option key={e} value={e}>{e}</option>
                    ))}*/}
        </select>
        {/* filtro todos, existente o creado */}
        <select name="" id="">
          <option value="All">Todos</option>
          <option value="Create">Creados</option>
          <option value="ExistenteApi">Existente</option>
        </select>
        {/* fin filtros-------------------------
       --------------------------------------  */}

        {/* llamando al componente Paginado */}
        <Paginado
          pokePage={pokePage}
          allPokemons={allPokemons.length}
          setPaginado={setPaginado}
        />

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
                />
                ;
              </Link>
            </Fragment>
          );
        })}
        {/* llamando al componente card----- */}
      </div>
    </div>
  );
}
