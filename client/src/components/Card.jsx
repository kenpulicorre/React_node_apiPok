import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import estilos from "./Home.module.css";
//acciones

export default function Card({ id, name, image, type }) {
  return (
    <div>
      <img
        src={image}
        alt="imagen no encontrada"
        width="200px"
        height="250px"
      />
      <h2>{name}</h2>
      <h3>{type}</h3>
    </div>
  );
}
