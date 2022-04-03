import React from "react";
import { Link } from "react-router-dom";
import estilos from "./LandingPage.module.css";

export default function LandingPage(params) {
  return (
    <div className={estilos.landing}>
      <h1> Buscador Pokemon</h1>
      <Link to="/home">
        <button>ingresar</button>
      </Link>
    </div>
  );
}
