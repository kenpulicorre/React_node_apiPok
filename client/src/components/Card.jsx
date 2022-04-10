import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import estilos from "./Home.module.css";
//acciones

export default function Card({ id, name, image, type, inDb }) {
  console.log("el type es ", type);

  let x = [];
  x = type.map((t) => (inDb ? t.name : t));
  console.log("ahora el tipo es :---", x);

  return (
    <div>
      <img
        src={image}
        alt="imagen no encontrada"
        width="200px"
        height="250px"
      />
      <h2>{name}</h2>

      {/* {inDb
        ? type.map((t) => (

            <p>
              <span key={t.id}>
                {t.name} {"   "}
              </span>
            </p>
          ))
        : type.map((t) => (
            <p>
              <span >
                {t} {"   "}
              </span>
            </p>
          ))} */}

      <p>
        <span>
          {x.map((t) => (
            <span key={t}>
              {t} {"   "}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}
