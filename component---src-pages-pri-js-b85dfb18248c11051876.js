(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{hKTy:function(a,o,n){"use strict";n.r(o),n.d(o,"default",(function(){return f}));var e=n("q1tI"),t=n.n(e),i=n("7oih"),r=n("EYWl"),s=n("r65+"),c=n("jl5S"),u=n.n(c),d={partido:"PRI",partidoDB:"PRI",intro:"PRI gobierna en 12 estados, (Campeche, Coahuila, Colima, Guerrero, Hidalgo, Estado de México, Oaxaca, San Luis Potosí, Sinaloa, Sonora, Tlaxcala y Zacatecas.)",texto:"PRI, en sus 12 estados tiene un total de "};function f(){return t.a.createElement(i.a,null,t.a.createElement(r.a,{title:"PRI"}),t.a.createElement(s.a,{datos:d}),t.a.createElement("h2",{className:"text-4xl font-semibold my-4"},"Estados donde gobierna el PRI"),t.a.createElement(u.a,null))}},"r65+":function(a,o,n){"use strict";n.d(o,"a",(function(){return c}));var e=n("q1tI"),t=n.n(e),i=n("Cyl9"),r=n("BYQ5"),s=n("BkJp");function c(a){var o=a.datos,n=o.partido,c=o.partidoDB,u=Object(e.useState)({fecha:"",confirmados:1,defunciones:1,ultimosConfirmados:1,ultimasDefunciones:1,arrayConfirmados:[],arrayDefunciones:[]}),d=u[0],f=u[1];Object(e.useEffect)((function(){fetch("https://covidporpartido.firebaseio.com/.json").then((function(a){return a.json()})).then((function(a){var o=a.ultimaAct,n=void 0!==a[c].defunciones[o]?o:Object(s.b)(o);f({fecha:o,confirmados:a[c].confirmados[o].acumulados,defunciones:a[c].defunciones[n].acumuladas,ultimosConfirmados:a[c].ultimosDatos.confirmados,ultimasDefunciones:a[c].ultimosDatos.defunciones,arrayConfirmados:Object(s.d)(Object(s.a)(a[c],"confirmados")),arrayDefunciones:Object(s.d)(Object(s.a)(a[c],"defunciones"))})}))}));var m=[{id:"confirmadosAcumulados",titulo:"Casos confirmados acumulados",dias:d.arrayConfirmados.map((function(a){return a[0]})),datosAGraficar:d.arrayConfirmados.map((function(a){return a[2]})),sonConfirmados:!0},{id:"confirmadosDiarios",titulo:"Casos confirmados diarios",dias:d.arrayConfirmados.map((function(a){return a[0]})),datosAGraficar:d.arrayConfirmados.map((function(a){return a[1]})),sonConfirmados:!0},{id:"defuncionesAcumuladas",titulo:"Defunciones acumuladas",dias:d.arrayDefunciones.map((function(a){return a[0]})),datosAGraficar:d.arrayDefunciones.map((function(a){return a[2]})),sonConfirmados:!1},{id:"defuncionesDiarias",titulo:"Defunciones diarias",dias:d.arrayDefunciones.map((function(a){return a[0]})),datosAGraficar:d.arrayDefunciones.map((function(a){return a[1]})),sonConfirmados:!1}];return t.a.createElement(t.a.Fragment,null,t.a.createElement(i.a,{titulo:"Resumen "+n,fecha:d.fecha,confirmados:{total:d.confirmados,ultimos:d.ultimosConfirmados},defunciones:{total:d.defunciones,ultimos:d.ultimasDefunciones}}),t.a.createElement(r.a,{datos:m}))}}}]);
//# sourceMappingURL=component---src-pages-pri-js-b85dfb18248c11051876.js.map