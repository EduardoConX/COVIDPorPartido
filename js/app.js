$(document).ready(()=>{
    //Menu hamburguesa
    $(".toggle-button").click(() => {
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
        })
    })

    //Funcion para separar a un numero cada 3 digitos
    numeroComas = numero => numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
        nombrePartido = $("<h3></h3>").text(partido["nombre"])
        poblacionTexto = $("<p></p>").text(poblacion + " habitantes")
        porcentajePoblacionTexto = $("<p></p>").text(porcentajePoblacion.toFixed(1) + "% de la población nacional")
        confirmadosTexto = $("<p></p>").text(confirmados + " casos confirmados")
        ppcTexto = $("<p></p>").text(porcentajePoblacionConfirmados.toFixed(3) + "% de su población")
        pctTexto = $("<p></p>").text(porcentajeConfirmadosTotales.toFixed(3) + "% de confirmados totales")
        defuncionesTexto = $("<p></p>").text(defunciones + " defunciones")
        pdtTexto = $("<p></p>").text(porcentajePoblacionDefunciones.toFixed(3) + "% de su población")
        ppdTexto = $("<p></p>").text(porcentajeDefuncionesTotales.toFixed(3) + "% de defunciones totales")
        letalidadTexto = $("<p></p>").text(letalidad.toFixed(1) + "% de letalidad");
        div = $("<div></div>").append(nombrePartido, poblacionTexto, porcentajePoblacionTexto, "<br>", confirmadosTexto, ppcTexto, pctTexto, "<br>", defuncionesTexto, ppdTexto, pdtTexto, letalidadTexto);
        div.addClass("partido")
        $(".partidos").append(div)
    };
})
