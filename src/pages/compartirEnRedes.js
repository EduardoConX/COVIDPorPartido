//React
import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Image from "../components/Image"

import { dividirMillares } from "../functions/functions"

import html2canvas from "html2canvas"

export default function CompartirEnRedes() {
  const partidos = [
    {
      nombre: "MORENA",
      nombreBD: "Morena",
    },
    {
      nombre: "PRI",
      nombreBD: "PRI",
    },
    {
      nombre: "PAN",
      nombreBD: "PAN",
    },
    {
      nombre: "Independiente",
      nombreBD: "Independiente",
    },
    {
      nombre: "Movimiento Ciudadano",
      nombreBD: "MC",
    },
    {
      nombre: "PRD",
      nombreBD: "PRD",
    },
    {
      nombre: "Encuentro Social",
      nombreBD: "PES",
    },
  ] //Escribe aqui el nombre de los partidos a mostrar, algunos partido usan otro nombre en la base datos, por favor, tambien anota ese nombre

  const datosOriginales = partidos.map(partido => {
    return {
      ...partido,
      confirmados: 1,
      nuevos: 1,
    }
  })

  const [datos, setDatos] = useState({
    fecha: "",
    partidos: datosOriginales,
  })

  useEffect(() => {
    fetch("https://covidporpartido.firebaseio.com/.json")
      .then(response => response.json())
      .then(json => {
        const fechaAux = json.ultimaAct

        const datoNuevos = partidos.map(partido => {
          return {
            ...partido,
            confirmados:
              json[partido.nombreBD].confirmados[fechaAux].acumulados,
            nuevos: json[partido.nombreBD].ultimosDatos.confirmados,
          }
        })
        setDatos({
          fecha: fechaAux,
          partidos: datoNuevos,
        })
      })
  }, [])

  function generarImagen(item) {
    const { nombre, nombreBD, confirmados, nuevos } = item
    return (
      <div key={nombreBD} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Image fileName={`${nombreBD}.png`} alt={nombre} clase="w-24" />
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <p className="text-3xl">
            {dividirMillares(confirmados)} casos confirmados
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl">
            {dividirMillares(confirmados - nuevos)} nuevos
          </p>
        </div>
      </div>
    )
  }

  function imprimirImagen() {
    html2canvas(document.getElementById("imagenDiaria"), {
      scrollY: -window.scrollY,
    }).then(canvas => {
      document.body.appendChild(canvas)
    })
  }

  return (
    <Layout>
      <SEO title="Compartir en redes" />
      <div id="imagenDiaria">
        <h2 className="text-4xl font-semibold my-4 text-center">
          Datos de COVID-19 al dia {datos.fecha}
        </h2>
        {datos.partidos.map(generarImagen)}
      </div>
      <p>Casos de COVID-19 Por Partido al día {datos.fecha}</p>
      <p>
        #COVID #COVID19 #Coronavirus #PRI #MORENA #PAN #PRD #MC #ES
        #Independiente #COVIDPorPartido
      </p>
      <p>Más información en http://bit.ly/3n4pNpv</p>
      <button onClick={imprimirImagen}>Generar imagen</button>
    </Layout>
  )
}
