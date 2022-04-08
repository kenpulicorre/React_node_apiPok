import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import estilos from "./Home.module.css";
//acciones
import { postPokemon, getTypes } from "../actions/index.js";

//componentes
import Card from "./Card";
import SearchBar from "./SearchBar";
//-----------------------------------------
export function CreateForm(params) {
  const dispatch = useDispatch();
  // const antes = useHistory();
  const types = useSelector((state) => state.types);
  //---
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  //---
  const [input, setInput] = useState({
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    types: [],
    // inDb: "",
  });

  //-----logica-----
  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  //---------------
  function handleOnCheckBox(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
        // height: [e.target.value],//esto modificaria solo el height
      });
    }
  }
  //--------------
  function handleOnOptionsSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }
  //--------------
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert("pokemon creado!!");
    setInput({
      name: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      types: [],
      // inDb: "",
    });
    // antes.push("/home");
  }
  //---- fin de logica----

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea pokemon</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder=" Nombre..."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Vida:</label>
          <input
            type="text"
            value={input.life}
            name="life"
            placeholder="Vida..."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Ataque:</label>
          <input
            type="text"
            value={input.attack}
            name="attack"
            placeholder="Ataque..."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Defensa:</label>
          <input
            type="text"
            value={input.defense}
            name="defense"
            placeholder="Defensa.."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Velocidad:</label>
          <input
            type="text"
            value={input.speed}
            name="speed"
            placeholder="Velocidad..."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Altura:</label>
          <input
            type="text"
            value={input.height}
            name="height"
            placeholder="Altura..."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Peso:</label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            placeholder="Peso..."
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <p></p>
        <div>
          <label htmlFor="">Imagen:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            placeholder="Ruta de imagen.."
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <p></p>
        <div>
          <label htmlFor="">Typo:</label>

          <label htmlFor="">
            <input
              type="checkbox"
              name="fire"
              value="fire"
              onChange={(e) => handleOnCheckBox(e)}
            />
            Fire
          </label>

          <label htmlFor="">
            <input
              type="checkbox"
              name="poison"
              value="poison"
              onChange={(e) => handleOnCheckBox(e)}
            />
            poison
          </label>

          <label htmlFor="">
            <input
              type="checkbox"
              name="unknown"
              value="unknown"
              onChange={(e) => handleOnCheckBox(e)}
            />
            unknown
          </label>
        </div>

        <select name="" id="" onChange={(e) => handleOnOptionsSelect(e)}>
          {types.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>

        <ul>
          <li>{input.types.map((el) => el + ",")}</li>
        </ul>

        <button type="submit">Crear pokemon</button>
      </form>
    </div>
  );
}

// <input
//   type="text"
//   placeholder="pokemon a buscar..."
//   onChange={(e) => handleInputOnChange(e)}
// />;
