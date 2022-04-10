import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../actions/index.js";
import { getDetallePoke } from "../actions/index.js";

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
  return (
    <div>
      {pokemonDetalle.length > 0 ? (
        <div>
          <h1>el pokemon {pokemonDetalle[0].name} soy yo</h1>
          <img src={pokemonDetalle[0].img} alt={pokemonDetalle.name} />
          {/* debo arregalr el types */}
          {/* <h3>
            tiposx:{" "}
            {!pokemonDetalle[0].inDb
              ? pokemonDetalle[0].types + " "
              : pokemonDetalle.types.map((el) => el.name + " ")}
          </h3> */}
          <h3>Id:{pokemonDetalle[0].id}</h3>
          <h3>Vida:{pokemonDetalle[0].life}</h3>
          <h3>Ataque fuerza:{pokemonDetalle[0].attack}</h3>
          <h3>Defensa:{pokemonDetalle[0].defense}</h3>
          <h3>Velocidad:{pokemonDetalle[0].speed}</h3>
          <h3>Altura:{pokemonDetalle[0].height}</h3>
          <h3>Peso:{pokemonDetalle[0].weight}</h3>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Link to="/home">
        <button>volver</button>
      </Link>
    </div>
  );
}
