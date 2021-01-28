//React
import React, { useState, useEffect } from "react"

//Componentes
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Resumen from "../components/Resumen"
import Graficas from "../components/Graficas"
import DatosPartido from "../components/DatosPartido"
import PreguntasFrecuentes from "../components/PreguntasFrecuentes"
import TablaGeneral from "../components/TablaGeneral"

//Funciones
import { JSONtoArray, ordenarArray, calcularAyer } from "../functions/functions"

export default function Index() {
  const partidos = [
    {
      nombre: "MORENA",
      nombreBD: "Morena",
      link: "morena",
    },
    {
      nombre: "PRI",
      nombreBD: "PRI",
      link: "pri",
    },
    {
      nombre: "PAN",
      nombreBD: "PAN",
      link: "pan",
    },
    {
      nombre: "Independiente",
      nombreBD: "Independiente",
      link: "independiente",
    },
    {
      nombre: "Movimiento Ciudadano",
      nombreBD: "MC",
      link: "movimientoCiudadano",
    },
    {
      nombre: "PRD",
      nombreBD: "PRD",
      link: "prd",
    },
    {
      nombre: "Encuentro Social",
      nombreBD: "PES",
      link: "encuentroSocial",
    },
  ] //Escribe aqui el nombre completo, nombre en la base de datos y link de los partidos a mostrar

  const datosOriginales = partidos.map(partido => {
    return {
      ...partido,
      confirmados: 1,
      defunciones: 1,
    }
  })

  const [datos, setDatos] = useState({
    fecha: "",
    arrayConfirmados: [],
    arrayDefunciones: [],
    nacional: {
      confirmados: 1,
      defunciones: 1,
      ultimosConfirmados: 0,
      ultimasDefunciones: 0,
    },
    datosPartidos: datosOriginales,
  })
  useEffect(() => {
    const cargarDatos = () => {
      //Lectura de la api
      fetch("https://covidporpartido.firebaseio.com/.json")
        .then(response => response.json())
        .then(json => {
          let fechaAux = json.ultimaAct
          const fechaDefunciones =
            typeof json.Nacional.defunciones[fechaAux] !== "undefined"
              ? fechaAux
              : calcularAyer(fechaAux)

          const datoNuevos = partidos.map(partido => {
            return {
              ...partido,
              confirmados:
                json[partido.nombreBD].confirmados[fechaAux].acumulados,
              defunciones:
                json[partido.nombreBD].defunciones[fechaDefunciones].acumuladas,
            }
          })
          setDatos({
            fecha: fechaAux,
            arrayConfirmados: ordenarArray(
              JSONtoArray(json.Nacional, "confirmados")
            ),
            arrayDefunciones: ordenarArray(
              JSONtoArray(json.Nacional, "defunciones")
            ),
            nacional: {
              confirmados: json.Nacional.confirmados[fechaAux].acumulados,
              defunciones:
                json.Nacional.defunciones[fechaDefunciones].acumuladas,
              ultimosConfirmados: json.Nacional.ultimosDatos.confirmados,
              ultimasDefunciones: json.Nacional.ultimosDatos.defunciones,
            },
            datosPartidos: datoNuevos,
          })
        })
    }
    cargarDatos()
  }, [])

  //Constantes
  const datosGraficas = [
    {
      id: "confirmadosAcumuladosNacional",
      titulo: "Casos confirmados acumulados",
      dias: datos.arrayConfirmados.map(e => e[0]),
      datosAGraficar: datos.arrayConfirmados.map(e => e[2]),
      sonConfirmados: true,
    },
    {
      id: "confirmadosDiariosNacional",
      titulo: "Casos confirmados diarios",
      dias: datos.arrayConfirmados.map(e => e[0]),
      datosAGraficar: datos.arrayConfirmados.map(e => e[1]),
      sonConfirmados: true,
    },
    {
      id: "defuncionesAcumuladasNacional",
      titulo: "Defunciones acumuladas",
      dias: datos.arrayDefunciones.map(e => e[0]),
      datosAGraficar: datos.arrayDefunciones.map(e => e[2]),
      sonConfirmados: false,
    },
    {
      id: "defuncionesDiariasNacional",
      titulo: "Defunciones diarias",
      dias: datos.arrayDefunciones.map(e => e[0]),
      datosAGraficar: datos.arrayDefunciones.map(e => e[1]),
      sonConfirmados: false,
    },
  ]

  const resumenPartidos = datos.datosPartidos

  //Funciones
  function generarDatosPartido(item) {
    const { nombre, nombreBD, confirmados, defunciones, link } = item
    return (
      <DatosPartido
        key={nombreBD}
        partido={nombre}
        confirmados={confirmados}
        defunciones={defunciones}
        link={link}
      />
    )
  }

  return (
    <Layout>
      <SEO title="Inicio" />
      <Resumen
        titulo="Resumen nacional"
        fecha={datos.fecha}
        confirmados={{
          total: datos.nacional.confirmados,
          ultimos: datos.nacional.ultimosConfirmados,
        }}
        defunciones={{
          total: datos.nacional.defunciones,
          ultimos: datos.nacional.ultimasDefunciones,
        }}
      />
      <Graficas datos={datosGraficas} />

      <section className="mb-12">
        <h2 className="text-4xl font-semibold my-4">Datos por partido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumenPartidos.map(generarDatosPartido)}
        </div>
      </section>
      <TablaGeneral datos={resumenPartidos} />
      <PreguntasFrecuentes />
    </Layout>
  )
}
