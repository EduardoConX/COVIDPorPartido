//React
import React, { useEffect, useState } from "react"

//Componentes
import Resumen from "../components/Resumen"
import Graficas from "../components/Graficas"
//Funciones
import { JSONtoArray, ordenarArray, calcularAyer } from "../functions/functions"

export default function PaginaPartido(props) {
  const { partido, partidoDB } = props.datos
  const [datos, setDatos] = useState({
    fecha: "",
    confirmados: 1,
    defunciones: 1,
    ultimosConfirmados: 1,
    ultimasDefunciones: 1,
    arrayConfirmados: [],
    arrayDefunciones: [],
  })

  useEffect(() => {
    fetch("https://covidporpartido.firebaseio.com/.json")
      .then(response => response.json())
      .then(json => {
        let fechaAux = json.ultimaAct
        const fechaDefunciones =
          typeof json[partidoDB].defunciones[fechaAux] !== "undefined"
            ? fechaAux
            : calcularAyer(fechaAux)
        setDatos({
          fecha: fechaAux,
          confirmados: json[partidoDB].confirmados[fechaAux].acumulados,
          defunciones: json[partidoDB].defunciones[fechaDefunciones].acumuladas,
          ultimosConfirmados: json[partidoDB].ultimosDatos.confirmados,
          ultimasDefunciones: json[partidoDB].ultimosDatos.defunciones,
          arrayConfirmados: ordenarArray(
            JSONtoArray(json[partidoDB], "confirmados")
          ),
          arrayDefunciones: ordenarArray(
            JSONtoArray(json[partidoDB], "defunciones")
          ),
        })
      })
  })

  //Constantes
  const datosGraficas = [
    {
      id: "confirmadosAcumulados",
      titulo: "Casos confirmados acumulados",
      dias: datos.arrayConfirmados.map(e => e[0]),
      datosAGraficar: datos.arrayConfirmados.map(e => e[2]),
      sonConfirmados: true,
    },
    {
      id: "confirmadosDiarios",
      titulo: "Casos confirmados diarios",
      dias: datos.arrayConfirmados.map(e => e[0]),
      datosAGraficar: datos.arrayConfirmados.map(e => e[1]),
      sonConfirmados: true,
    },
    {
      id: "defuncionesAcumuladas",
      titulo: "Defunciones acumuladas",
      dias: datos.arrayDefunciones.map(e => e[0]),
      datosAGraficar: datos.arrayDefunciones.map(e => e[2]),
      sonConfirmados: false,
    },
    {
      id: "defuncionesDiarias",
      titulo: "Defunciones diarias",
      dias: datos.arrayDefunciones.map(e => e[0]),
      datosAGraficar: datos.arrayDefunciones.map(e => e[1]),
      sonConfirmados: false,
    },
  ]

  return (
    <>
      <Resumen
        titulo={`Resumen ${partido}`}
        fecha={datos.fecha}
        confirmados={{
          total: datos.confirmados,
          ultimos: datos.ultimosConfirmados,
        }}
        defunciones={{
          total: datos.defunciones,
          ultimos: datos.ultimasDefunciones,
        }}
      />
      <Graficas datos={datosGraficas} />
    </>
  )
}
