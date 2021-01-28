import React from "react"
import { Doughnut } from "react-chartjs-2"

//Funciones
import { dividirMillares } from "../functions/functions"

export default function Resumen(props) {
  const { titulo, fecha, confirmados, defunciones } = props
  const datos = [
    {
      tipo: "casosConfirmados",
      total: confirmados.total,
      ultimos: confirmados.ultimos,
    },
    {
      tipo: "defunciones",
      total: defunciones.total,
      ultimos: defunciones.ultimos,
    },
  ]

  const letalidad = ((datos[1].total / datos[0].total) * 100).toFixed(1)
  const supervivencia = 100 - letalidad

  const datosGrafica = {
    datasets: [
      {
        data: [supervivencia, letalidad],
        backgroundColor: ["#878787", "#ef4444"],
        hoverBackgroundColor: ["#878787", "#ef4444"],
      },
    ],
  }

  const opciones = {
    tooltips: {
      enabled: false,
    },
    cutoutPercentage: 75,
  }

  function generarConfirmadosDefunciones(item) {
    const { tipo, total, ultimos } = item
    const sonConfirmados = tipo === "casosConfirmados" ? true : false
    return (
      <div
        className={`text-center my-4 bg-white rounded-sm p-4 border-l-4 border-${
          sonConfirmados ? "red-500" : "black"
        }`}
        key={tipo}
      >
        <h3
          className={`text-3xl font-bold text-${
            sonConfirmados ? "red-500" : "black"
          }`}
        >
          {dividirMillares(total)}
        </h3>
        <p className="text-2xl">
          {sonConfirmados ? "Casos confirmados" : "Defunciones"}
        </p>
        <p>
          +{dividirMillares(total - ultimos)}{" "}
          {sonConfirmados ? "casos nuevos" : "defunciones nuevas"}
        </p>
      </div>
    )
  }

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-semibold">{titulo}</h2>
      <p>Datos actualizados al dia {fecha}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {datos.map(generarConfirmadosDefunciones)}
        <div className="text-center my-4 bg-white rounded-sm p-4 border-l-4 border-black flex">
          <div className="w-2/5">
            <Doughnut data={datosGrafica} options={opciones} />
          </div>
          <div className="w-3/5">
            <h3 className="text-3xl font-bold text-black">
              {letalidad}% de letalidad
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
