(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BkJp:function(e,n,t){"use strict";t.d(n,"a",(function(){return o})),t.d(n,"d",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"b",(function(){return c}));var o=function(e,n){var t=[];if("confirmados"===n)for(var o in e.confirmados)t.push([o,e.confirmados[o].confirmados,e.confirmados[o].acumulados,e.confirmados[o].dia]);else for(var a in e.defunciones)t.push([a,e.defunciones[a].defunciones,e.defunciones[a].acumuladas,e.defunciones[a].dia]);return t},a=function(e){return e=e.sort((function(e,n){return e[3]-n[3]}))},r=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},c=function(e){var n=e.slice(3,5),t=e.slice(0,2);return 1===t?n=(n="0"+--n).slice(-2):t=(t="0"+--t).slice(-2),t+"-"+n+"-"+e.slice(6,10)}},"x+HQ":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return m}));var o=t("q1tI"),a=t.n(o),r=t("7oih"),c=t("EYWl"),i=t("5Epl"),s=t("BkJp"),u=t("wOnQ"),l=t.n(u);function m(){var e=[{nombre:"MORENA",nombreBD:"Morena"},{nombre:"PRI",nombreBD:"PRI"},{nombre:"PAN",nombreBD:"PAN"},{nombre:"Independiente",nombreBD:"Independiente"},{nombre:"Movimiento Ciudadano",nombreBD:"MC"},{nombre:"PRD",nombreBD:"PRD"},{nombre:"Encuentro Social",nombreBD:"PES"}],n=e.map((function(e){return Object.assign({},e,{confirmados:1,nuevos:1})})),t=Object(o.useState)({fecha:"",partidos:n}),u=t[0],m=t[1];return Object(o.useEffect)((function(){fetch("https://covidporpartido.firebaseio.com/.json").then((function(e){return e.json()})).then((function(n){var t=n.ultimaAct,o=e.map((function(e){return Object.assign({},e,{confirmados:n[e.nombreBD].confirmados[t].acumulados,nuevos:n[e.nombreBD].ultimosDatos.confirmados})}));m({fecha:t,partidos:o})}))}),[]),a.a.createElement(r.a,null,a.a.createElement(c.a,{title:"Compartir en redes"}),a.a.createElement("div",{id:"imagenDiaria"},a.a.createElement("h2",{className:"text-4xl font-semibold my-4 text-center"},"Datos de COVID-19 al dia ",u.fecha),u.partidos.map((function(e){var n=e.nombre,t=e.nombreBD,o=e.confirmados,r=e.nuevos;return a.a.createElement("div",{key:t,className:"grid grid-cols-1 md:grid-cols-4 gap-4"},a.a.createElement("div",null,a.a.createElement(i.a,{fileName:t+".png",alt:n,clase:"w-24"})),a.a.createElement("div",{className:"col-span-2 flex flex-col justify-center"},a.a.createElement("p",{className:"text-3xl"},Object(s.c)(o)," casos confirmados")),a.a.createElement("div",{className:"flex flex-col justify-center"},a.a.createElement("p",{className:"text-2xl"},Object(s.c)(o-r)," nuevos")))}))),a.a.createElement("p",null,"Casos de COVID-19 Por Partido al día ",u.fecha),a.a.createElement("p",null,"#COVID #COVID19 #Coronavirus #PRI #MORENA #PAN #PRD #MovimientoCiudadano #EncuentroSocial #Independiente #COVIDPorPartido"),a.a.createElement("p",null,"Más información en http://bit.ly/3n4pNpv"),a.a.createElement("button",{onClick:function(){l()(document.getElementById("imagenDiaria"),{scrollY:-window.scrollY}).then((function(e){document.body.appendChild(e)}))}},"Generar imagen"))}}}]);
//# sourceMappingURL=component---src-pages-compartir-en-redes-js-d28ac642a0af198334a2.js.map