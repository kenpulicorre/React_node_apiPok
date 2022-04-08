import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import estilos from "./Home.module.css";
import { postPokemon, getTypes } from "../actions/index.js";
//acciones
import {
  FilterPokesBytype,
  FilterPokesCreated,
  orderByName,
} from "../actions/index.js";
import getPokemons from "../actions/index";
import { xx } from "../actions/index";

//componentes
import Card from "./Card";
import SearchBar from "./SearchBar";
//-----------------------------------------
