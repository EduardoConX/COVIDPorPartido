import React from "react"
import { Link } from "gatsby"

export default function DatosPartido(props) {
  const { id, partido, confirmados, defunciones, link } = props
  return (
    <div key={id} className="bg-white rounded-sm p-4 border-4">
      <h3 className="text-3xl font-semibold">{partido}</h3>
      <p>
        {confirmados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} casos
        confirmados
      </p>
      <p>
        {defunciones.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        defunciones
      </p>
      <p className="pt-4 pb-2 text-2xl text-center font-bold text-blue-700 underline">
        <Link to={`/${link}`}>
          Mas información <span className="sr-only">sobre {partido}</span>
        </Link>
      </p>
    </div>
  )
}
