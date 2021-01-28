import React from "react"
import { Line } from "react-chartjs-2"

function generarGraficas(item) {
  const { id, titulo, dias, datosAGraficar, sonConfirmados } = item
  const color = sonConfirmados ? "rgba(231, 74, 59,0.3)" : "rgba(0, 0, 0,0.3)"
  return (
    <div key={id} className="w-full my-4 bg-white rounded-sm p-4">
      <h3 className="text-3xl">{titulo}</h3>
      <Line
        data={{
          labels: dias,
          datasets: [
            {
              label: titulo,
              fill: true,
              lineTension: 0.1,
              backgroundColor: color,
              borderColor: color,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: datosAGraficar,
            },
          ],
        }}
      ></Line>
    </div>
  )
}

export default function Graficas(props) {
  return <section className="mb-12">{props.datos.map(generarGraficas)}</section>
}
