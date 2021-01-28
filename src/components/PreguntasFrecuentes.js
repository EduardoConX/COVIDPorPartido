import React from "react"
import Image from "../components/Image"

export default function PreguntasFrecuentes() {
  const estadosPartido = [
    {
      id: 1,
      partido: "PRI",
      estados:
        "Campeche*, Coahuila, Colima, Guerrero, Hidalgo, Estado de México, Oaxaca, San Luis Potosí, Sinaloa, Sonora, Tlaxcala y Zacatecas. (12 estados).",
    },
    {
      id: 2,
      partido: "PAN",
      estados:
        "Aguascalientes, Baja California Sur, Chihuahua, Durango, Guanajuato, Nayarit, Querétaro, Tamaulipas, Yucatán. (9 estados).",
    },
    {
      id: 3,
      partido: "MORENA",
      estados:
        "Baja California, Chiapas, Ciudad de México, Puebla, Tabasco y Veracruz. (6 estados).",
    },
    {
      id: 4,
      partido: "PRD",
      estados: "Michoacán y Quintana Roo. (2 estados).",
    },
    {
      id: 5,
      partido: "Movimiento Ciudadano",
      estados: "Jalisco. (1 estado).",
    },
    {
      id: 6,
      partido: "Encuentro Social",
      estados: "Morelos (1 estado).",
    },
    {
      id: 7,
      partido: "Independiente",
      estados: "Nuevo León (1 estado).",
    },
  ]

  function generarLista(item) {
    const { id, partido, estados } = item
    return (
      <li key={id} className="my-2">
        <p>
          <strong>{partido}: </strong>
          {estados}
        </p>
      </li>
    )
  }

  return (
    <section className="mb-12">
      <h2 className="text-4xl font-semibold my-4">Preguntas frecuentes</h2>
      <h3 className="text-3xl my-4">¿Que estados pertenecen a que partidos?</h3>
      <p>
        La distribución de estados según el partido que los gobierna es la
        siguiente:
      </p>
      <ul>{estadosPartido.map(generarLista)}</ul>
      <p>
        *Campeche es gobernado oficialmente por un gobernador sustituto, pero es
        militante del PRI y el antiguo gobernador también es del PRI por lo que
        se cuenta como gobernado por el PRI.
      </p>
      <Image
        fileName="EstadosPorPartido.png"
        alt="Estados por partido"
        clase="w-full max-w-screen-sm mt-2"
      />
      <p className="text-sm">
        <cite>Mexico Governors Map</cite> de Wikimedia Commons
      </p>
      <h3 className="text-3xl my-4">
        ¿De dónde se obtienen los datos mostrados?
      </h3>
      <p>
        Los datos son obtenidos del sitio web oficial del Gobierno de México{" "}
        <a
          className="underline text-blue-700"
          href="https://coronavirus.gob.mx/datos/"
        >
          https://coronavirus.gob.mx/datos/
        </a>
      </p>
      <h3 className="text-3xl my-4">¿Qué es el porcentaje de letalidad?</h3>
      <p>
        El porcentaje de letalidad o tasa de letalidad es la proporción de
        personas que han muerto por COVID entre la cantidad de casos
        confirmados.
      </p>
    </section>
  )
}
