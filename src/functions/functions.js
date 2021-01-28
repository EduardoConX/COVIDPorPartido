const JSONtoArray = (objetoJSON, tipo) => {
  var arregloAGraficar = []
  if (tipo === "confirmados") {
    for (var k in objetoJSON.confirmados) {
      arregloAGraficar.push([
        k,
        objetoJSON.confirmados[k].confirmados,
        objetoJSON.confirmados[k].acumulados,
        objetoJSON.confirmados[k].dia,
      ])
    }
  } else {
    for (var l in objetoJSON.defunciones) {
      arregloAGraficar.push([
        l,
        objetoJSON.defunciones[l].defunciones,
        objetoJSON.defunciones[l].acumuladas,
        objetoJSON.defunciones[l].dia,
      ])
    }
  }
  return arregloAGraficar
}

const ordenarArray = arrayAOrdenar => {
  arrayAOrdenar = arrayAOrdenar.sort((a, b) => a[3] - b[3])
  return arrayAOrdenar
}

const dividirMillares = numero =>
  numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const calcularAyer = fecha => {
  /*Convierte la ultima fecha de string a date, para poder restarle un dia,
        despues la regresa a string para poder ser usada en el JSON*/

  var mes = fecha.slice(3, 5)
  var dia = fecha.slice(0, 2)
  if (dia === 1) {
    //Si es el primero del mes
    mes--
    mes = "0" + mes
    mes = mes.slice(-2)
  } else {
    //Si no es el primer dia del mes
    dia--
    dia = "0" + dia
    dia = dia.slice(-2)
  }
  const fechaDefunciones = dia + "-" + mes + "-" + fecha.slice(6, 10)
  return fechaDefunciones
}

export { JSONtoArray, ordenarArray, dividirMillares, calcularAyer }
