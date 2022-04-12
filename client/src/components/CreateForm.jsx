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
export default function CreateForm(params) {
  const dispatch = useDispatch();
  // const antes = useHistory();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.todosPokemons);
  //---
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  //---
  const [errors, setErrors] = useState({});
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
    console.log("errors", errors);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));

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
    let mm = errors;
    console.log("errror es:", mm.attack, "def", mm.defense);
    if (mm.defense || mm.height || mm.img || mm.speed || mm.weight) {
      console.log("errors", errors);
      return alert("debe de agregar cada valor!!");
    } else {
      dispatch(postPokemon(input));
      alert("pokemon creado!!");
    }

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

  //-------------

  //-------------
  let alfabetico = /^[a-z]+$/;
  let numerico = /^[0-9]+$/;
  const url = /^(ftp|http|https):\/\/[^ "]+$/;
  function handleValidacion(input) {
    let errors = {};
    //1
    if (!input.name || !alfabetico.test(input.name)) {
      errors.name =
        "Solo se permite caracteres del alfabeto (a hata la z), no se permite vacio";
    }
    //2

    if (
      allPokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())
    ) {
      errors.name = "ya existe dicho pokemon";
    }
    //3

    if (!url.test(input.img)) {
      errors.img = "Solo se permite un Url valido o dejar vacio este elemento";
    }

    //4
    if (!numerico.test(input.life) || input.life > 300 || input.life < 1) {
      errors.life = "Se espera un valor entre 1 y 300";
    }
    //5
    if (
      !numerico.test(input.attack) ||
      input.attack > 300 ||
      input.attack < 1
    ) {
      errors.attack = "Se espera un valor entre 1 y 300";
    }
    //6
    if (
      !numerico.test(input.defense) ||
      input.defense > 200 ||
      input.defense < 1
    ) {
      errors.defense = "Se espera un valor entre 1 y 200";
    }
    //7
    if (!numerico.test(input.speed) || input.speed > 250 || input.speed < 1) {
      errors.speed = "Se espera un valor entre 1 y 250";
    }
    //8
    if (
      !numerico.test(input.height) ||
      input.height > 1000 ||
      input.height < 1
    ) {
      errors.height = "Se espera un valor entre 1 y 1000";
    }
    //9
    if (
      !numerico.test(input.weight) ||
      input.weight > 2000 ||
      input.weight < 1
    ) {
      errors.weight = "Se espera un valor entre 1 y 2000";
    }
    return errors;
  }

  //-------------
  function handleDelete(elBorrar) {
    setInput({
      ...input,
      types: input.types.filter((el) => el !== elBorrar),
    });
  }
  //---- fin de logica----
  let x;
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea pokemon</h1>
      <form
        action=""
        onSubmit={(e) => {
          return handleSubmit(e);
        }}
      >
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
        {/* <p>{errors.name}</p> */}

        {errors.name && <p>{errors.name}</p>}
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
        {errors.life && <p>{errors.life}</p>}
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
        {errors.attack && <p>{errors.attack}</p>}

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
        {errors.defense && <p>{errors.defense}</p>}

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
        {errors.speed && <p>{errors.speed}</p>}

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
        {errors.height && <p>{errors.height}</p>}

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
        {errors.weight && <p>{errors.weight}</p>}

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
        {errors.img && <p>{errors.img}</p>}

        <p></p>

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
      {input.types.map((el) => (
        <div key={el}>
          <p>{el}</p>
          <button onClick={() => handleDelete(el)}>x</button>
        </div>
      ))}
    </div>
  );
}

// <input
//   type="text"
//   placeholder="pokemon a buscar..."
//   onChange={(e) => handleInputOnChange(e)}
// />;
