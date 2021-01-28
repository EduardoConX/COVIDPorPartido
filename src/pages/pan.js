import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"

const datos = {
  partido: "PAN",
  partidoDB: "PAN",
  intro:
    "PAN gobierna en 9 estados, (CAguascalientes, Baja California Sur, Chihuahua, Durango, Guanajuato, Nayarit, Querétaro, Tamaulipas, Yucatán.)",
  texto: "PAN, en sus 9 estados tiene un total de ",
}

export default function PAN() {
  return (
    <Layout>
      <SEO title="PAN" />
      <PaginaPartido datos={datos} />
    </Layout>
  )
}
