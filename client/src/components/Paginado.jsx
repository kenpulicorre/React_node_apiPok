import React from "react";
import estilos from "./Paginado.module.css";
export default function Paginado({ pokePage, allPokemons, setPaginado }) {
  const nPages = [];
  let max = Math.ceil(allPokemons / pokePage);
  for (let i = 0; i < max; i++) {
    nPages.push(i + 1);
  }
  return (
    <nav>
      <ul className={estilos.ordenarul}>
        {nPages &&
          nPages.map((el) => (
            <li className={estilos.ordenar} key={el}>
              <a onClick={() => setPaginado(el)} className={estilos.elem}>
                {el}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
