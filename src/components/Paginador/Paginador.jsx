import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

export default function Paginador({ datos, elementosPorPagina, handlePagination, reset}) {
  const [paginaActual, setPaginaActual] = useState(1);
  const cantidadDePaginas = Math.ceil(datos.length / elementosPorPagina);

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const elementosEnPaginaActual = datos.slice(indicePrimerElemento, indiceUltimoElemento);

  const cambiarPagina = (numeroDePagina) => {
    setPaginaActual(numeroDePagina);
    let indiceUltimoElemento = numeroDePagina * elementosPorPagina;
    let indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    let elementosEnPaginaActual = datos.slice(indicePrimerElemento, indiceUltimoElemento);
    handlePagination(elementosEnPaginaActual)
  };

  const items = [];
  for (let i = 1; i <= cantidadDePaginas; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === paginaActual}
        onClick={() => cambiarPagina(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    handlePagination(elementosEnPaginaActual)
  }, [datos])

  useEffect(() => {
    if (reset) {
      cambiarPagina(1)
    }
  }, [reset])

  return (
    <Pagination>
      <Pagination.Prev
        disabled={paginaActual === 1}
        onClick={() => cambiarPagina(paginaActual - 1)}
      />
      {items}
      <Pagination.Next
        disabled={paginaActual === cantidadDePaginas}
        onClick={() => cambiarPagina(paginaActual + 1)}
      />
    </Pagination>
  );
}