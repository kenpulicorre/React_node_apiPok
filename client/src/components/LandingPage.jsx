import React from "react";
import { Link } from "react-router-dom";
import estilos from "./LandingPage.module.css";
import { connect, useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

export default function LandingPage(params) {
  // if (allPokemons.length < 1) {
  //   return <Loader />;
  // }

  return (
    <div className={estilos.landing}>
      <h1 className={estilos.texto}> Buscador Pokemon</h1>
      <Link to="/home" className={estilos.button}>
        <p></p>
        <button>INGRESAR</button>
        <p></p>
      </Link>{" "}
      <p></p>
      <p></p>
      <p></p>
      <h6 className={estilos.fintexto}>Creado por @kenpulicorre</h6>
    </div>
  );
}
