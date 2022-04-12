import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../actions/index.js";
import { getDetallePoke } from "../actions/index.js";
import estilos from "./DetailPoke.module.css";

export default function DetailPoke(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams(); //foma 2 con el hook useparams
  useEffect(() => {
    //dispatch(getDetallePoke(props.match.params.id)); //forma 1 con match
    dispatch(getDetallePoke(id)); //foma 2 con el hook useparams
  }, [id, dispatch]);
  // }, [id,dispatch]);///foma 2 con el hook useparams

  //-----
  const pokemonDetalle = useSelector((state) => state.detalle);
  let x = [];
  //
  if (pokemonDetalle.length > 0) {
    console.log("ahora el tipo en detalle es:---", pokemonDetalle[0].types);
    x = pokemonDetalle[0].types.map((t) =>
      pokemonDetalle[0].inDb ? t.name : t
    );
  }
  console.log(x);
  return (
    <div>
      <h1 className={estilos.container0}></h1>
      <div>
        <Link to="/home">
          <button className={estilos.boton}>VOLVER</button>
        </Link>
        {pokemonDetalle.length > 0 ? (
          <div className={estilos.container}>
            <h1 className={estilos.name}>
              {pokemonDetalle[0].name.toUpperCase()}
            </h1>
            <img
              className={estilos.img}
              src={pokemonDetalle[0].img}
              alt={pokemonDetalle.name}
            />
            {/* debo arregalr el types */}

            <div className={estilos.infoContainer}>
              <h3>Id:{pokemonDetalle[0].id}</h3>
              <h3>Vida:{pokemonDetalle[0].life}</h3>
              <h3>Ataque fuerza:{pokemonDetalle[0].attack}</h3>
              <h3>Defensa:{pokemonDetalle[0].defense}</h3>
              <h3>Velocidad:{pokemonDetalle[0].speed}</h3>
              <h3>Altura:{pokemonDetalle[0].height}</h3>
              <h3>Peso:{pokemonDetalle[0].weight}</h3>
              <h3>
                Tipos:
                <p>
                  {x.map((t) => (
                    <span key={t}>
                      {t} {"    "}
                    </span>
                  ))}
                </p>
              </h3>
              <p></p>
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
        <p></p>
        <Link to="/home">
          <button className={estilos.boton}>VOLVER</button>
        </Link>
      </div>
    </div>
  );
}
