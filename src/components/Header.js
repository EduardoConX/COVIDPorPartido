import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

export default function Header({ siteTitle }) {
  const enlaces = [
    {
      nombre: "MORENA",
      link: "morena",
    },
    {
      nombre: "PRI",
      link: "pri",
    },
    {
      nombre: "PAN",
      link: "pan",
    },
    {
      nombre: "Independiente",
      link: "independiente",
    },
    {
      nombre: "Movimiento Ciudadano",
      link: "movimientoCiudadano",
    },
    {
      nombre: "PRD",
      link: "prd",
    },
    {
      nombre: "Encuentro Social",
      link: "encuentroSocial",
    },
  ]

  const [show, setShow] = useState(false)

  const generarLinks = item => (
    <li className="text-center" key={item.link}>
      <Link
        to={`/${item.link}`}
        className="p-4 block"
        role="menuitem"
        activeClassName="p-4 block underline"
      >
        {item.nombre}
      </Link>
    </li>
  )
  return (
    <header>
      <nav className="flex items-start flex-col content-between bg-black text-white w-full fixed top-0 z-10">
        <div className="m-4 text-base tracking-widest md:text-2xl">
          <Link to="/">COVID Por Partido</Link>
        </div>
        <button
          className="absolute top-4 right-4 block "
          onClick={() => setShow(!show)}
        >
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="sr-only">Toggle button</span>
        </button>
        <div className={`${show ? "block" : "hidden"} w-full`}>
          <ul className="w-full flex flex-col">{enlaces.map(generarLinks)}</ul>
        </div>
      </nav>
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
