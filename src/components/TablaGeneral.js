import React, { useMemo } from "react"
import { useTable, useSortBy } from "react-table"

import { dividirMillares } from "../functions/functions"

export default function TablaGeneral(props) {
  const { datos } = props
  const columnas = datos.map(partido => {
    return {
      col1: partido.nombre,
      col2: dividirMillares(partido.confirmados),
      col3: dividirMillares(partido.defunciones),
      col4: `${((partido.defunciones / partido.confirmados) * 100).toFixed(
        1
      )}%`,
    }
  })

  const data = useMemo(
    () => columnas,
    [datos] //Dependencias, se actualizara el hook cada las dependencias se actualicen
  )

  const columns = useMemo(
    () => [
      {
        Header: "Partido",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Casos confirmados",
        accessor: "col2",
      },
      {
        Header: "Defunciones",
        accessor: "col3",
      },
      {
        Header: "% de letalidad",
        accessor: "col4",
      },
    ],
    []
  )
  const tableInstance = useTable({ columns, data }, useSortBy)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <section className="mb-12">
      <div className="overflow-x-auto">
        <h2 className="text-4xl font-semibold my-4">Tabla general</h2>
        <table
          className="w-full my-4 border-collapse text-right"
          {...getTableProps()}
        >
          <thead className="bg-black text-white font-semibold">
            {
              // Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map(column => (
                      // Apply the header cell props
                      <th
                        className="p-3"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td className="p-3" {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
