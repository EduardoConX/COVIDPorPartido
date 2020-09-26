$(document).ready(()=>{
    //Menu hamburguesa
    $(".toggle-button").click(() => {
        $(".navbar-links").toggleClass("activo")
    })

    $(".navbar-links").click(() => {
        $(".navbar-links").toggleClass("activo")
    })

    //Funcion para crear partidos
    function Partido(nombrePartido, nombreBD, poblacion, color){
        this.nombre = nombrePartido;
        this.nombreBD = nombreBD;
        this.poblacion = poblacion;
        this.color = color;
    }

    //Creacion de los partidos
    encuentroSocial = new Partido("Encuentro Social", "PES", 2044058, "#800080");
    independiente = new Partido("Independiente", "Independiente", 5610153, "#a9a9a9");
    movimientoCiudadano = new Partido("Movimiento Ciudadano", "MC", 8409693, "#ffa500");
    morena = new Partido("Morena", "Morena", 36100480, "#b5261e");
    pan = new Partido("PAN", "PAN", 23615909, "#05338d");
    prd = new Partido("PRD", "PRD", 6548660, "#ffd700");
    pri = new Partido("PRI", "PRI", 45463333, "#009150");
    //nacional = new Partido("Total nacional", "Nacional", 127792286, "black");
    //partidos = [encuentroSocial, independiente, movimientoCiudadano, morena, pan, prd, pri, nacional]
    partidos = [encuentroSocial, independiente, movimientoCiudadano, morena, pan, prd, pri]

    //Arreglo para los datos de la tabla
    datosTabla = []

    //Tabla
    var tabla = $("#tablaResumen").DataTable(
        {
            data: datosTabla,
            paging: false,
            searching: false,
            info: false,
        })

    //Lectura de la api
    fetch("https://covidporpartido.firebaseio.com/.json")
    .then(response => response.json())
    .then(json =>{
        const fecha = json.ultimaAct
        $("#fecha").text(fecha);
        const confirmados = json.Nacional.confirmados[fecha].acumulados;
        const defunciones = json.Nacional.defunciones[fecha].acumuladas;
        const letalidad = defunciones * 100 / confirmados
        $("#numeroConfirmados").text(numeroComas(confirmados));
        $("#numeroDefunciones").text(numeroComas(defunciones));
        $("#porcentajeLetalidad").text(letalidad.toFixed(1));
        $("#fecha").text(json.ultimaAct);

        partidos.forEach( partido => {
            const confirmadosPartido = json[partido["nombreBD"]].confirmados[fecha].acumulados
            const defuncionesPartido = json[partido["nombreBD"]].defunciones[fecha].acumuladas

            generarResumenPartido(partido, confirmadosPartido, defuncionesPartido, confirmados, defunciones)
            graficarCurva(json[partido["nombreBD"]].confirmados, partido["nombreBD"])
        })
        
    })

    //Funcion para generar los resumenes por partido
    generarResumenPartido = (partido, confirmados, defunciones, confirmadosNacionales, defuncionesNacionales) => {
        //datos
        //Poblacion de los estados del partido
        poblacion = partido["poblacion"]

        //Porcentaje de la poblacion nacional
        porcentajePoblacion = poblacion * 100 / 127792286

        //Porcentaje de la poblacion confirmada
        porcentajePoblacionConfirmados = confirmados * 100 / poblacion

        //Porcentaje de los confirmados totales
        porcentajeConfirmadosTotales = confirmados * 100 / confirmadosNacionales

        //Porcentaje de las defunciones totales
        porcentajeDefuncionesTotales = defunciones * 100 / defuncionesNacionales
        
        //Porcentaje de la poblacion que murio
        porcentajePoblacionDefunciones = defunciones * 100 / poblacion

        //Letalidad/Porcentaje de confirmados que murieron
        letalidad = defunciones * 100 / confirmados

        //Escritura en el DOM
        //Datos generales
        nombrePartido = $("<h3></h3>").text(partido["nombre"])
        poblacionTexto = $("<p></p>").text(numeroComas(poblacion) + " habitantes")
        porcentajePoblacionTexto = $("<p></p>").text(porcentajePoblacion.toFixed(1) + "% de la población nacional")
        poblacionDiv = $("<div></div>").append(poblacionTexto, porcentajePoblacionTexto)
        poblacionDiv.addClass("mini-card mini-card-poblacion")

        //Confirmados
        confirmadosTexto = $("<p></p>").text(numeroComas(confirmados) + " casos confirmados")
        ppcTexto = $("<p></p>").text(porcentajePoblacionConfirmados.toFixed(3) + "% de su población")
        pctTexto = $("<p></p>").text(porcentajeConfirmadosTotales.toFixed(3) + "% de los confirmados totales")
        confirmadosDiv = $("<div></div>").append(confirmadosTexto, ppcTexto, pctTexto)
        confirmadosDiv.addClass("mini-card mini-card-confirmados")

        //Defunciones
        defuncionesTexto = $("<p></p>").text(numeroComas(defunciones) + " defunciones")
        pdtTexto = $("<p></p>").text(porcentajePoblacionDefunciones.toFixed(3) + "% de su población")
        ppdTexto = $("<p></p>").text(porcentajeDefuncionesTotales.toFixed(3) + "% de las defunciones totales")
        letalidadTexto = $("<p></p>").text(letalidad.toFixed(1) + "% de letalidad");
        defuncionesDiv = $("<div></div>").append(defuncionesTexto, pdtTexto, ppdTexto, letalidadTexto)
        defuncionesDiv.addClass("mini-card mini-card-defunciones")

        //Graficas
        canvasCurva = $("<canvas></canvas>").attr("id", "curva" + partido["nombreBD"])
        canvasSemaforo = $("<canvas></canvas>").attr("id", "semaforo" + partido["nombreBD"])

        //divPartido = $("<div></div>").append(nombrePartido, poblacionDiv, confirmadosDiv, defuncionesDiv, canvasCurva, canvasSemaforo);
        divPartido = $("<div></div>").append(nombrePartido, poblacionDiv, confirmadosDiv, defuncionesDiv, canvasCurva);
        divPartido.addClass("partido")
        $(".partidos").append(divPartido)

        datosTabla = [partido["nombre"], numeroComas(confirmados), numeroComas(defunciones), letalidad.toFixed(3)]
        tabla.row.add(datosTabla).draw();
    };

    graficarCurva = (confirmados, partido) =>{
        datosCurva = []
        fechasCurva = []
        confirmadosOrdenados = ordenarArray(confirmados)
        var ctx = $("#curva" + partido)
        
        var dias = confirmadosOrdenados.map(function(e){
            return e.dia;
        });
        
        var datos = confirmadosOrdenados.map(function(e){
            return e.acumulados;
        });

        var miCurva = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dias,
                datasets: [{
                    label: "Casos confirmados",
                    data: datos,
                    backgroundColor: 'rgba(231, 74, 39, 0.3)'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Dias transcurridos"
                        }
                    }]
                }
            }
        });
    }

    //Funcion para separar a un numero cada 3 digitos
    numeroComas = numero => numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    //Ordenar arreglo por fechas
    ordenarArray = objetoDias =>{
        arregloDias = Object.values(objetoDias);
        arregloDias.sort((a,b) => a.dia - b.dia);
        return arregloDias
    }
})
