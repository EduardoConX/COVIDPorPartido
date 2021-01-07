//Lista de partidos con su nombre completo y el que tienen en la base de datos
encuentroSocial = ["Encuentro Social", "PES"];
independiente = ["Independiente", "Independiente"];
movimientoCiudadano = ["Movimiento Ciudadano", "MC"];
morena = ["Morena", "Morena"];
pan = ["PAN", "PAN"];
prd = ["PRD", "PRD"];
pri = ["PRI", "PRI"];
partidos = [encuentroSocial, independiente, movimientoCiudadano, morena, pan, prd, pri]

//Arreglo para los datos de la tabla
datosTabla = []

//Tabla
var tabla = $("#tabla").DataTable(
    {
        data: datosTabla,
        paging: false,
        searching: false,
        info: false,
        columnDefs: [
            { className: "border-t border-black", targets: "_all" },
        ],
    });

//Lectura de la api
fetch("https://covidporpartido.firebaseio.com/.json")
.then(response => response.json())
.then(json => {
    const fecha = json.ultimaAct;
    var fechaDefunciones = fecha;
    $("#ultimaAct").text(fecha);
    const confirmados = json.Nacional.confirmados[fecha].acumulados;
    var defunciones;
    try{
        /*Intenta obtener las defunciones actualizadas al ultimo dia,
        pero normalmente en fin de semana no las actualizan*/
        defunciones = json.Nacional.defunciones[fecha].acumuladas;
    }catch(error){
        /*En caso de que no esten actualizadas al ultimo dia, obtiene 
        las defunciones actualizadas al dia anterior*/

        /*Convierte la ultima fecha de string a date, para poder restarle un dia,
        despues la regresa a string para poder ser usada en el JSON*/
        mes = fecha.slice(3,5)
        dia = fecha.slice(0,2)
        if(dia == 1){
            //Si es el primero del mes
            mes--;
            mes = "0" + mes;
            mes = mes.slice(-2)
        }else{
            //Si no es el primer dia del mes
            dia--;
            dia = "0" + dia;
            dia = dia.slice(-2)
        }        
        fechaDefunciones = dia + "-" + mes + "-" + fecha.slice(6,10);
        defunciones = json.Nacional.defunciones[fechaDefunciones].acumuladas;
    }
    
    const letalidad = defunciones * 100 / confirmados
    $("#casosConfirmados").text(numeroComas(confirmados));
    $("#defunciones").text(numeroComas(defunciones));
    $("#porcentajeLetalidad").text(letalidad.toFixed(1));
    $("#fecha").text(json.ultimaAct);

    datosTabla = ["Total nacional", numeroComas(confirmados), numeroComas(defunciones), letalidad.toFixed(3)]
    tabla.row.add(datosTabla).draw();

    var confirmadosNacionales = JSONtoArray(json.Nacional, "confirmados");
    confirmadosNacionales = ordenarArray(confirmadosNacionales);
    var defuncionesNacionales = JSONtoArray(json.Nacional, "defunciones");
    defuncionesNacionales = ordenarArray(defuncionesNacionales);

    graficarConfirmados(confirmadosNacionales, "Nacional");
    graficarDefunciones(defuncionesNacionales, "Nacional");
    //

    //Por cada partido
    partidos.forEach( partido => {
        const confirmadosPartido = json[partido[1]].confirmados[fecha].acumulados
        const defuncionesPartido = json[partido[1]].defunciones[fechaDefunciones].acumuladas

        generarResumenPartido(partido[0], confirmadosPartido, defuncionesPartido);
    })
})

//Funcion para generar los resumenes por partido
generarResumenPartido = (partido, confirmados, defunciones) => {
    var info = ` 
    <div class='bg-white rounded-sm p-4 border-4'>
        <h3 class='text-3xl font-semibold'>${partido}</h3>
        <p>${numeroComas(confirmados)} casos confirmados</p>
        <p>${numeroComas(defunciones)} defunciones</p>
    </div>` 
    $("#gridPartido").append(info);

    var letalidad = defunciones * 100 / confirmados;
    datosTabla = [partido, numeroComas(confirmados), numeroComas(defunciones), letalidad.toFixed(3)]
    tabla.row.add(datosTabla).draw();
};

//Funcion para separar a un numero cada 3 digitos
numeroComas = numero => numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

//Graficas
const graficarConfirmados = (arreglo, partido) =>{

    const canvasConfirmadosAcumulados = $("#confirmadosAcumulados" + partido)
    const canvasConfirmadosDiarios = $("#confirmadosDiarios" + partido)

    //Array de dias
    const dias = arreglo.map(e => e[0]);    

    //Array de confirmados diarios
    const confirmadosDiarios = arreglo.map(e => e[1]);
    const confirmadosAcumulados = arreglo.map(e => e[2]);

    const graficaConfirmadosAcumulados = new Chart(canvasConfirmadosAcumulados, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: "Casos confirmados",
                data: confirmadosAcumulados,
                backgroundColor: 'rgba(231, 74, 59, 0.3)'
            }]
        },
        options: {
            responsive: true,
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

    const graficaConfirmadosDiarios = new Chart(canvasConfirmadosDiarios, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: "Casos diarios",
                data: confirmadosDiarios,
                backgroundColor: 'rgba(231, 74, 59, 0.3)'
            }]
        },
        options: {
            responsive: true,
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

const graficarDefunciones = (arreglo, partido) =>{
    
    const canvasDefuncionesAcumuladas = $("#defuncionesAcumuladas" + partido)
    const canvasDefuncionesDiarias = $("#defuncionesDiarias" + partido)

    //Array de dias
    const dias = arreglo.map(e => e[0]);    

    //Array de defunciones diarias
    const defuncionesDiarias = arreglo.map(e => e[1]);
    const defuncionesAcumuladas = arreglo.map(e => e[2]);

    const graficaDefuncionesAcumuladas = new Chart(canvasDefuncionesAcumuladas, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: "Defunciones acumuladas",
                data: defuncionesAcumuladas,
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }]
        },
        options: {
            responsive: true,
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

    const graficaDefuncionesDiarias = new Chart(canvasDefuncionesDiarias, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [{
                label: "Defunciones diarias",
                data: defuncionesDiarias,
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }]
        },
        options: {
            responsive: true,
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

const ordenarArray = arrayAOrdenar =>{
    arrayAOrdenar = arrayAOrdenar.sort((a,b) => a[3] - b[3]);
    return arrayAOrdenar;
}


const JSONtoArray = (objetoJSON, tipo) =>{
    var arregloAGraficar = [];
    if(tipo=="confirmados"){
        for(var k in objetoJSON.confirmados){
            arregloAGraficar.push([k, objetoJSON.confirmados[k].confirmados, objetoJSON.confirmados[k].acumulados, objetoJSON.confirmados[k].dia])
        }
    }else{
        for(var k in objetoJSON.defunciones){
            arregloAGraficar.push([k, objetoJSON.defunciones[k].defunciones, objetoJSON.defunciones[k].acumuladas, objetoJSON.defunciones[k].dia])
        }
    }
    return arregloAGraficar;
}

const paginaPartido = partido =>{
    console.log(partido);
}