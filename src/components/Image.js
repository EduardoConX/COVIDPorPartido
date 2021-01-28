import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

export default function Image(props) {
  const { fileName, alt, clase } = props
  return (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const imagen = data.images.edges.find(imagen => {
          return imagen.node.relativePath.includes(fileName)
        })
        if (!imagen) return null
        return (
          <Img
            alt={alt}
            fluid={imagen.node.childImageSharp.fluid}
            className={clase}
          />
        )
      }}
    />
  )
}
