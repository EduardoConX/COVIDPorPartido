import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"

const datos = {
  partido: "PRD",
  partidoDB: "PRD",
  intro: "PRD gobierna en 2 estados, (Michoacán y Quintana Roo.)",
  texto: "PRD, en sus 2 estados tiene un total de ",
}

export default function PRD() {
  return (
    <Layout>
      <SEO title="PRD" />
      <PaginaPartido datos={datos} />
    </Layout>
  )
}
