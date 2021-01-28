import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"
import PRISVG from "../images/PRI.svg"

const datos = {
  partido: "PRI",
  partidoDB: "PRI",
  intro:
    "PRI gobierna en 12 estados, (Campeche, Coahuila, Colima, Guerrero, Hidalgo, Estado de México, Oaxaca, San Luis Potosí, Sinaloa, Sonora, Tlaxcala y Zacatecas.)",
  texto: "PRI, en sus 12 estados tiene un total de ",
}

export default function PRI() {
  return (
    <Layout>
      <SEO title="PRI" />
      <PaginaPartido datos={datos} />
      <h2 className="text-4xl font-semibold my-4">
        Estados donde gobierna el PRI
      </h2>
      <PRISVG />
    </Layout>
  )
}
