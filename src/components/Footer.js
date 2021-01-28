import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="bg-black text-white p-2 text-center">
      <p className="my-2 text-xl">Compartir en redes sociales</p>
      <a href="http://www.facebook.com/sharer.php?u=https://eduardoconx.github.io/COVIDPorPartido/">
        <FontAwesomeIcon icon={faFacebookSquare} className="fa-2x m-4" />
        <span className="sr-only">Compartir en Facebook</span>
      </a>
      <a href="http://twitter.com/share?text=Como+manejó+el+COVID+tu+partido+favorito?.+%23COVIDPorPartido+--+&url=https://eduardoconx.github.io/COVIDPorPartido">
        <FontAwesomeIcon icon={faTwitterSquare} className="fa-2x m-4" />
        <span className="sr-only">Compartir en Twitter</span>
      </a>
      <h3 className="my-2 text-xl">
        Página creada y actualizada por{" "}
        <u>
          <a href="https://github.com/EduardoConX">Eduardo Pacheco</a>
        </u>
      </h3>
      <p className="my-4 text-xl">
        <a
          className="border-2 p-1 hover:bg-white hover:text-black"
          href="https://github.com/EduardoConX/COVIDPorPartido"
        >
          Proyecto en Github
        </a>
      </p>
    </footer>
  )
}
