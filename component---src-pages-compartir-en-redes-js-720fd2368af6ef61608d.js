(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BkJp:function(e,n,t){"use strict";t.d(n,"a",(function(){return a})),t.d(n,"d",(function(){return o})),t.d(n,"c",(function(){return r})),t.d(n,"b",(function(){return c}));var a=function(e,n){var t=[];if("confirmados"===n)for(var a in e.confirmados)t.push([a,e.confirmados[a].confirmados,e.confirmados[a].acumulados,e.confirmados[a].dia]);else for(var o in e.defunciones)t.push([o,e.defunciones[o].defunciones,e.defunciones[o].acumuladas,e.defunciones[o].dia]);return t},o=function(e){return e=e.sort((function(e,n){return e[3]-n[3]}))},r=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},c=function(e){var n=e.slice(3,5),t=e.slice(0,2);return 1===t?n=(n="0"+--n).slice(-2):t=(t="0"+--t).slice(-2),t+"-"+n+"-"+e.slice(6,10)}},"x+HQ":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return m}));var a=t("q1tI"),o=t.n(a),r=t("7oih"),c=t("EYWl"),i=t("5Epl"),s=t("BkJp"),l=t("wOnQ"),u=t.n(l);function m(){var e=[{nombre:"MORENA",nombreBD:"Morena"},{nombre:"PRI",nombreBD:"PRI"},{nombre:"PAN",nombreBD:"PAN"},{nombre:"Independiente",nombreBD:"Independiente"},{nombre:"Movimiento Ciudadano",nombreBD:"MC"},{nombre:"PRD",nombreBD:"PRD"},{nombre:"Encuentro Social",nombreBD:"PES"}],n=e.map((function(e){return Object.assign({},e,{confirmados:1,nuevos:1})})),t=Object(a.useState)({fecha:"",partidos:n}),l=t[0],m=t[1];return Object(a.useEffect)((function(){fetch("https://covidporpartido.firebaseio.com/.json").then((function(e){return e.json()})).then((function(n){var t=n.ultimaAct,a=e.map((function(e){return Object.assign({},e,{confirmados:n[e.nombreBD].confirmados[t].acumulados,nuevos:n[e.nombreBD].ultimosDatos.confirmados})}));m({fecha:t,partidos:a})}))}),[]),o.a.createElement(r.a,null,o.a.createElement(c.a,{title:"Compartir en redes"}),o.a.createElement("div",{id:"imagenDiaria"},o.a.createElement("h2",{className:"text-4xl font-semibold my-4 text-center"},"Datos de COVID-19 al dia ",l.fecha),l.partidos.map((function(e){var n=e.nombre,t=e.nombreBD,a=e.confirmados,r=e.nuevos;return o.a.createElement("div",{key:t,className:"grid grid-cols-1 md:grid-cols-4 gap-4"},o.a.createElement("div",null,o.a.createElement(i.a,{fileName:t+".png",alt:n,clase:"w-24"})),o.a.createElement("div",{className:"col-span-2 flex flex-col justify-center"},o.a.createElement("p",{className:"text-3xl"},Object(s.c)(a)," casos confirmados")),o.a.createElement("div",{className:"flex flex-col justify-center"},o.a.createElement("p",{className:"text-2xl"},Object(s.c)(a-r)," nuevos")))}))),o.a.createElement("p",null,"Casos de COVID-19 Por Partido al día ",l.fecha),o.a.createElement("p",null,"#COVID #COVID19 #Coronavirus #PRI #MORENA #PAN #PRD #MC #ES #Independiente #COVIDPorPartido"),o.a.createElement("p",null,"Más información en http://bit.ly/3n4pNpv"),o.a.createElement("button",{onClick:function(){u()(document.getElementById("imagenDiaria"),{scrollY:-window.scrollY}).then((function(e){document.body.appendChild(e)}))}},"Generar imagen"))}}}]);
//# sourceMappingURL=component---src-pages-compartir-en-redes-js-720fd2368af6ef61608d.js.map