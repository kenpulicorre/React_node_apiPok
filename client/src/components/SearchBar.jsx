import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
// import estilos from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputOnChange(e) {
    console.log("handleInputOnChange--on--SearchBar.jsx! ");
    e.preventDefault();
    setName(e.target.value.toLowerCase(), console.log(name));
    // console.log(name);
  }

  function handleSubmit(e) {
    console.log("handleSubmit--on--SearchBar.jsx! ");
    e.preventDefault();
    if (name) {
      dispatch(getNamePokemons(name));
      setName("");
    }
  }
  let handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("handleKeyPress--on--SearchBar.jsx! ");
      if (name) {
        dispatch(getNamePokemons(name));
        setName("");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="pokemon a buscar..."
        onChange={(e) => handleInputOnChange(e)}
        value={name}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
//       <input
//
//

//         value={name}
//         onChange={handleInputChange}
//         className={estilos.contenedor}
//       />
//       <button type="submit" onClick={handleSubmit} className={estilos.btn}>
//         Buscar
//       </button>
