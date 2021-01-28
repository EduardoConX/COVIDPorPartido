import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"

const datos = {
  partido: "MORENA",
  partidoDB: "Morena",
  intro:
    "MORENA gobierna en 6 estados, (Baja California, Chiapas, Ciudad de México, Puebla, Tabasco y Veracruz.)",
  texto: "Morena, en sus 6 estados tiene un total de ",
}

const Morena = () => (
  <Layout>
    <SEO title="Morena" />
    <PaginaPartido datos={datos} />
  </Layout>
)

export default Morena
