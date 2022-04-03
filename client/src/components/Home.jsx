import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import estilos from "./Home.module.css";
//acciones
import { getPokemons } from "../actions/index.js";

//-----------------------------------------

export default function Home(params) {
  const dispatch = useDispatch(); //mapdispatchtoprops
  const allPokemons = useSelector((state) => state.todosPokemons); //mapstatetoprops

  //cuando el componente se monta traer pokes
  useEffect(() => {});
}
