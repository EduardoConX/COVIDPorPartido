import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"

const datos = {
  partido: "Movimiento Ciudadano",
  partidoDB: "MC",
  intro: "Movimiento ciudadano gobierna unicamente en el estado de Jalisco",
  texto: "En Jalisco, Movimiento Ciudadano tiene un total de ",
}

export default function MovimientoCiudadano() {
  return (
    <Layout>
      <SEO title="Movimiento Ciudadano" />
      <PaginaPartido datos={datos} />
    </Layout>
  )
}
