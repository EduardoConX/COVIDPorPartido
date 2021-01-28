import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"

const datos = {
  partido: "Independiente",
  partidoDB: "Independiente",
  intro:
    "El estado de Nuevo León es el único estado de México en ser gobernado por un gobernador independiente, es decir, que no está afiliado a ningún partido político.",
  texto:
    "El estado de Nuevo León y su gobierno independiente tiene un total de ",
}

export default function Independiente() {
  return (
    <Layout>
      <SEO title="Independiente" />
      <PaginaPartido datos={datos} />
    </Layout>
  )
}
