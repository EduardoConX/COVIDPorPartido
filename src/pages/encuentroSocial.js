import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PaginaPartido from "../components/PaginaPartido"

const datos = {
  partido: "Encuentro Social",
  partidoDB: "PES",
  intro: "Encuentro Social gobierna unicamente en el estado de Morelos",
  texto: "En Morelos, Encuentro Social tiene un total de ",
}

export default function encuentroSocial() {
  return (
    <Layout>
      <SEO title="Encuentro Social" />
      <PaginaPartido datos={datos} />
    </Layout>
  )
}
