import pandas as pd
from datetime import date, timedelta
import json
import sys

hoy = date.today()
try:
    dfConfirmados = pd.read_csv(
        "Casos_Diarios_Estado_Nacional_Confirmados_" + hoy.strftime("%Y%m%d") + ".csv")
    dfDefunciones = pd.read_csv(
        "Casos_Diarios_Estado_Nacional_Defunciones_" + hoy.strftime("%Y%m%d") + ".csv")
except:
    ayer = hoy - timedelta(days=1)
    print("Archivos de hoy no encontrados, usando los de ayer...")
    dfConfirmados = pd.read_csv(
        "Casos_Diarios_Estado_Nacional_Confirmados_" + ayer.strftime("%Y%m%d") + ".csv")
    dfDefunciones = pd.read_csv(
        "Casos_Diarios_Estado_Nacional_Defunciones_" + ayer.strftime("%Y%m%d") + ".csv")

# Datos de ayer
f = open('UltimaAct.json')
datosAyer = json.load(f)

# Listas de fechas
listaFechasConfirmados = []
listaFechasDefunciones = []

# Llenado de listas de fechas
# Lista con el nombre de las columnas (para la fecha)
columnasConfirmados = dfConfirmados.columns.values.tolist()
for i in range(3, len(dfConfirmados.columns)):
    # listaFechasConfirmados.append(columnasConfirmados[i].replace('-',''))
    listaFechasConfirmados.append(columnasConfirmados[i])

# Lista con el nombre de las columnas (para la fecha)
columnasDefunciones = dfDefunciones.columns.values.tolist()
for i in range(3, len(dfDefunciones.columns)):
    # listaFechasDefunciones.append(columnasDefunciones[i].replace('-',''))
    listaFechasDefunciones.append(columnasDefunciones[i])

# Funcion para generar el diccionario por partido


def GeneraDiccionarioPorPartido(estados, partido, diccionario):
    # Casos confirmados
    listaConfirmadosPorPartido = dfConfirmados.loc[dfConfirmados['cve_ent'].isin(
        estados)].sum().tolist()
    listaConfirmadosDiarios = []
    listaConfirmadosAcumulados = []

    acumulados = 0
    for i in range(3, len(listaConfirmadosPorPartido)):
        # Convertirlos a enteros para poderlos serializar
        listaConfirmadosDiarios.append(int(listaConfirmadosPorPartido[i]))
        acumulados = acumulados + listaConfirmadosPorPartido[i]
        listaConfirmadosAcumulados.append(int(acumulados))

    diccionarioConfirmados = {}
    for i in range(len(listaFechasConfirmados)):
        diccionarioConfirmados[listaFechasConfirmados[i]] = {
            "dia": i, "confirmados": listaConfirmadosDiarios[i], "acumulados": listaConfirmadosAcumulados[i]}

    # Defunciones
    listaDefuncionesPorPartido = dfDefunciones.loc[dfDefunciones['cve_ent'].isin(
        estados)].sum().tolist()
    listaDefuncionesDiarias = []
    listaDefuncionesAcumuladas = []

    acumulados = 0
    for i in range(3, len(listaDefuncionesPorPartido)):
        listaDefuncionesDiarias.append(int(listaDefuncionesPorPartido[i]))
        acumulados = acumulados + listaDefuncionesPorPartido[i]
        listaDefuncionesAcumuladas.append(int(acumulados))

    diccionarioDefunciones = {}
    for i in range(len(listaFechasDefunciones)):
        diccionarioDefunciones[listaFechasDefunciones[i]] = {
            "dia": i, "defunciones": listaDefuncionesDiarias[i], "acumuladas": listaDefuncionesAcumuladas[i]}

    diccionarioPartido = {"confirmados": diccionarioConfirmados,
                          "defunciones": diccionarioDefunciones, "ultimosDatos": diccionario}
    return diccionarioPartido


# Diccionario de ultimos resultados
dictUltPES = datosAyer["pes"]
dictUltInd = datosAyer["ind"]
dictUltMC = datosAyer["mc"]
dictUltMorena = datosAyer["morena"]
dictUltPAN = datosAyer["pan"]
dictUltPRD = datosAyer["prd"]
dictUltPRI = datosAyer["pri"]
dictUltNac = datosAyer["nacional"]

# Llamada a la funcion/Generar diccionario por partido
dictPES = GeneraDiccionarioPorPartido(["17"], "PES", dictUltPES)
dictInd = GeneraDiccionarioPorPartido(["19"], "Ind", dictUltInd)
dictMC = GeneraDiccionarioPorPartido(["14"], "MC", dictUltMC)
dictMorena = GeneraDiccionarioPorPartido(
    ["2", "7", "9", "21", "27", "30"], "Morena", dictUltMorena)
dictPAN = GeneraDiccionarioPorPartido(
    ["1", "3", "8", "10", "11", "18", "22", "28", "31"], "PAN", dictUltPAN)
dictPRD = GeneraDiccionarioPorPartido(["16", "23"], "PRD", dictUltPRD)
dictPRI = GeneraDiccionarioPorPartido(
    ["4", "5", "6", "12", "13", "15", "20", "24", "25", "26", "29", "32"], "PRI", dictUltPRI)
dictNacional = GeneraDiccionarioPorPartido(["0"], "Nacional", dictUltNac)

diccionarioFinal = {
    "Nacional": dictNacional,
    "PES": dictPES,
    "Independiente": dictInd,
    "MC": dictMC,
    "Morena": dictMorena,
    "PAN": dictPAN,
    "PRD": dictPRD,
    "PRI": dictPRI,
    "ultimaAct": columnasConfirmados[-1]
}

ultimaAct = {
    "nacional": {"confirmados": dictNacional["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictNacional["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "morena": {"confirmados": dictMorena["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictMorena["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "pri": {"confirmados": dictPRI["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictPRI["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "pan": {"confirmados": dictPAN["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictPAN["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "prd": {"confirmados": dictPRD["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictPRD["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "pes": {"confirmados": dictPES["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictPES["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "mc": {"confirmados": dictMC["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictMC["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
    "ind": {"confirmados": dictInd["confirmados"][columnasConfirmados[-1]]["acumulados"], "defunciones": dictInd["defunciones"][columnasDefunciones[-1]]["acumuladas"]},
}

with open('COVIDPorPartido.json', 'w') as fp:
    json.dump(diccionarioFinal, fp)

with open('UltimaAct.json', 'w') as fp:
    json.dump(ultimaAct, fp)
