import React from "react";
//hoooks
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import estilos from "./CreateForm.module.css";
//acciones
import { postPokemon, getTypes } from "../actions/index.js";

//componentes
import Card from "./Card";
import SearchBar from "./SearchBar";

//-----------------------------------------
export default function CreateForm(params) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.todosPokemons);
  //---
  useEffect(() => {
    dispatch(getTypes());
    console.log("entrada", input.name);
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
  useEffect(() => {
    setErrors(handleValidacion({ ...input, ["types"]: input.types }));
  }, [input]);
  //-----logica-----
  //--------------handleOnChange
  function handleOnChange(e) {
    console.log("errors", errors);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));

    console.log(input);
  }
  //--------------fin handleOnChange

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
  //--------------handleOnOptionsSelect
  let handleOnOptionsSelect = (e) => {
    console.log("----handleOnOptionsSelect---e---", e.target.value);
    setInput({
      ...input,
      ["types"]: [...input.types, e.target.value],
    });
    setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));
  };
  //--------------fin handleOnOptionsSelect

  //--------------handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    console.log("entrada", input);
    let mm = errors;
    console.log("errror es:", mm.attack, "def", mm.defense);
    if (input.name == "") {
      setErrors(handleValidacion({ ...input, ["name"]: "" }));
      return alert("debe de agregar cada valor!!");
    }
    console.log("tiiiiipo--", input.types.length);
    if (!input.types.length == 0) {
      console.log("entroo bien los types", input.types);
      setErrors(handleValidacion({ ...input, ["types"]: input.types }));
      //    return alert("debe de agregar cada valor!!");
    }

    if (
      mm.name ||
      mm.life ||
      mm.attack ||
      mm.defense ||
      mm.height ||
      mm.weight ||
      mm.img ||
      mm.speed ||
      mm.types
    ) {
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
  //-------------fin handleSubmit

  //-------------handleValidacion
  let alfabetico = /^[a-z]+$/;
  let numerico = /^[0-9]+$/;
  const url = /^(ftp|http|https):\/\/[^ "]+$/;
  let handleValidacion = (input) => {
    let errors = {};
    //10
    if (input.types.length === 0) {
      errors.types = `al menos un tipo`;
    } else {
      //1
      if (!input.name || !alfabetico.test(input.name)) {
        errors.name =
          "Solo se permite caracteres del alfabeto (a hata la z), no se permite vacio";
      } else {
        //2
        if (
          allPokemons.find(
            (p) => p.name.toLowerCase() === input.name.toLowerCase()
          )
        ) {
          errors.name = "ya existe dicho pokemon";
        } else {
          //3---life
          if (
            !numerico.test(input.life) ||
            input.life > 300 ||
            input.life < 1
          ) {
            errors.life = "Se espera un valor entre 1 y 300";
          } else {
            //4---attack
            if (
              !numerico.test(input.attack) ||
              input.attack > 300 ||
              input.attack < 1
            ) {
              errors.attack = "Se espera un valor entre 1 y 300";
            } else {
              //5---defese
              if (
                !numerico.test(input.defense) ||
                input.defense > 200 ||
                input.defense < 1
              ) {
                errors.defense = "Se espera un valor entre 1 y 200";
              } else {
                //6---speed
                if (
                  !numerico.test(input.speed) ||
                  input.speed > 250 ||
                  input.speed < 1
                ) {
                  errors.speed = "Se espera un valor entre 1 y 250";
                } else {
                  //7---height
                  if (
                    !numerico.test(input.height) ||
                    input.height > 1000 ||
                    input.height < 1
                  ) {
                    errors.height = "Se espera un valor entre 1 y 1000";
                  } else {
                    //8---weight
                    if (
                      !numerico.test(input.weight) ||
                      input.weight > 2000 ||
                      input.weight < 1
                    ) {
                      errors.weight = "Se espera un valor entre 1 y 2000";
                    } else {
                      //9---imagen
                      if (!url.test(input.img) && input.img !== "") {
                        errors.img =
                          "Solo se permite un Url valido o dejar vacio este elemento";
                      }
                      //else {
                      //10---types
                      // console.log("tipo en el--- ", input.types.length);
                      // if (input.types.length === 0) {
                      //   errors.types = `al menos un tipo`;
                      // }
                      //}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return errors;
  };
  //-------------fin handleValidacion

  //-------------handleDelete
  function handleDelete(elBorrar) {
    setInput({
      ...input,
      types: input.types.filter((el) => el !== elBorrar),
    });
  }
  //-------------Fin handleDelete

  //---- fin de logica----
  let x;
  return (
    <div>
      <h1 className={estilos.title}>Seccion de Creacion de pokemon</h1>
      <Link to="/home">
        <button className={estilos.boton}>VOLVER</button>
      </Link>

      <form
        action=""
        onSubmit={(e) => {
          return handleSubmit(e);
        }}
        className={estilos.formulario}
      >
        <div className={estilos.typocontainer}>
          <div className={estilos.selectTipo}>
            <label className={estilos.selectTypes__text}>Tipo</label>
            <select
              name=""
              id=""
              onChange={(e) => handleOnOptionsSelect(e)}
              className={estilos.selecttiposelec}
            >
              {types.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="" className={estilos.error}>
            {errors.types && <p>{errors.types}</p>}
          </label>
          <div className={estilos.formulariotypo}>
            {input.types.map((el) => (
              <div key={el}>
                {/* <p>{el}</p> */}
                <button
                  type="button"
                  onClick={() => handleDelete(el)}
                  className={estilos.fuente}
                >
                  x
                </button>
                <span>{el}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder=" Nombre..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.name && <p>{errors.name}</p>}
          </label>
        </div>
        {/* <p>{errors.name}</p> */}

        <div>
          <label htmlFor="">Vida:</label>
          <input
            type="text"
            value={input.life}
            name="life"
            placeholder="Vida..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.life && <p>{errors.life}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="">Ataque:</label>
          <input
            type="text"
            value={input.attack}
            name="attack"
            placeholder="Ataque..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.attack && <p>{errors.attack}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="">Defensa:</label>
          <input
            type="text"
            value={input.defense}
            name="defense"
            placeholder="Defensa.."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.defense && <p>{errors.defense}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="">Velocidad:</label>
          <input
            type="text"
            value={input.speed}
            name="speed"
            placeholder="Velocidad..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.speed && <p>{errors.speed}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="">Altura:</label>
          <input
            type="text"
            value={input.height}
            name="height"
            placeholder="Altura..."
            onChange={(e) => handleOnChange(e)}
          />

          <label htmlFor="" className={estilos.error}>
            {errors.height && <p>{errors.height}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="">Peso:</label>
          <input
            className={estilos.fijo}
            type="text"
            value={input.weight}
            name="weight"
            placeholder="Peso..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.weight && <p>{errors.weight}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="">Imagen:</label>
          <input
            className={estilos.fijo}
            type="text"
            value={input.img}
            name="img"
            placeholder="Ruta de imagen.."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.img && <p>{errors.img}</p>}
          </label>
        </div>

        {/* <ul>
          <li>{input.types.map((el) => el + ",")}</li>
        </ul> */}

        <button type="submit" className={estilos.boton}>
          {" "}
          Crear pokemon
        </button>
      </form>
    </div>
  );
}

// <input
//   type="text"
//   placeholder="pokemon a buscar..."
//   onChange={(e) => handleInputOnChange(e)}
// />;
