import pandas as pd
import datetime
import json

justoAhora = datetime.datetime.now()
try:
    dfConfirmados = pd.read_csv("Casos_Diarios_Estado_Nacional_Confirmados_" + justoAhora.strftime("%Y%m%d") + ".csv")
    dfDefunciones = pd.read_csv("Casos_Diarios_Estado_Nacional_Defunciones_" + justoAhora.strftime("%Y%m%d") + ".csv")
except:
    print("Archivos no encontrados")
##Manual por si falla en encontrar la fecha
#dfConfirmados = pd.read_csv('Casos_Diarios_Estado_Nacional_Confirmados_20200930.csv')
#dfDefunciones = pd.read_csv('Casos_Diarios_Estado_Nacional_Defunciones_20200930.csv')

#Listas de fechas
listaFechasConfirmados = []
listaFechasDefunciones = []

#Llenado de listas de fechas
columnasConfirmados = dfConfirmados.columns.values.tolist()#Lista con el nombre de las columnas (para la fecha)
for i in range(3, len(dfConfirmados.columns)):
    #listaFechasConfirmados.append(columnasConfirmados[i].replace('-',''))
    listaFechasConfirmados.append(columnasConfirmados[i])

columnasDefunciones = dfDefunciones.columns.values.tolist()#Lista con el nombre de las columnas (para la fecha)
for i in range(3, len(dfDefunciones.columns)):
    #listaFechasDefunciones.append(columnasDefunciones[i].replace('-',''))
    listaFechasDefunciones.append(columnasDefunciones[i])

#Funcion para generar el diccionario por partido
def GeneraDiccionarioPorPartido(estados, partido, semaforo):
    #Casos confirmados
    listaConfirmadosPorPartido = dfConfirmados.loc[dfConfirmados['cve_ent'].isin(estados)].sum().tolist()
    listaConfirmadosDiarios = []
    listaConfirmadosAcumulados = []
    
    acumulados = 0
    for i in range(3, len(listaConfirmadosPorPartido)):
        listaConfirmadosDiarios.append(int(listaConfirmadosPorPartido[i]))#Convertirlos a enteros para poderlos serializar
        acumulados = acumulados + listaConfirmadosPorPartido[i]
        listaConfirmadosAcumulados.append(int(acumulados))
    
    diccionarioConfirmados = {}
    for i in range(len(listaFechasConfirmados)):
        diccionarioConfirmados[listaFechasConfirmados[i]] = {"dia": i, "confirmados": listaConfirmadosDiarios[i], "acumulados": listaConfirmadosAcumulados[i]}

    #Defunciones
    listaDefuncionesPorPartido = dfDefunciones.loc[dfDefunciones['cve_ent'].isin(estados)].sum().tolist()
    listaDefuncionesDiarias = []
    listaDefuncionesAcumuladas = []

    acumulados = 0
    for i in range(3, len(listaDefuncionesPorPartido)):
        listaDefuncionesDiarias.append(int(listaDefuncionesPorPartido[i]))
        acumulados = acumulados + listaDefuncionesPorPartido[i]
        listaDefuncionesAcumuladas.append(int(acumulados))
    
    diccionarioDefunciones = {}
    for i in range(len(listaFechasDefunciones)):
        diccionarioDefunciones[listaFechasDefunciones[i]] = {"dia": i, "defunciones": listaDefuncionesDiarias[i], "acumuladas": listaDefuncionesAcumuladas[i]}
    
    diccionarioPartido = {"confirmados": diccionarioConfirmados, "defunciones": diccionarioDefunciones, "semaforo": semaforo}
    return diccionarioPartido

#Poner los semaforos manualmente hasta que se encuentre como automatizarlos
semaforoPES = {"Amarillo": 1}
semaforoInd = {"Naranja": 1}
semaforoMC = {"Naranja" :1}
semaforoMorena = {"Amarillo": 4, "Naranja": 2}
semaforoPAN = {"Amarillo" : 6, "Naranja": 3}
semaforoPRD = {"Naranja": 2}
semaforoPRI = {"Verde": 1, "Amarillo": 5, "Naranja": 6}
semaforoNacional = {"Verde": 1, "Amarillo": 16, "Naranja": 15}

#Llamada a la funcion/Generar diccionario por partido
dictPES = GeneraDiccionarioPorPartido(["17"], "PES", semaforoPES)
dictInd = GeneraDiccionarioPorPartido(["19"], "Ind", semaforoInd)
dictMC = GeneraDiccionarioPorPartido(["14"], "MC", semaforoMC)
dictMorena = GeneraDiccionarioPorPartido(["2", "7", "9", "21", "27", "30"], "Morena", semaforoMorena)
dictPAN = GeneraDiccionarioPorPartido(["1", "3", "8", "10", "11", "18", "22", "28", "31"], "PAN", semaforoPAN)
dictPRD = GeneraDiccionarioPorPartido(["16", "23"], "PRD", semaforoPRD)
dictPRI = GeneraDiccionarioPorPartido(["4", "5", "6", "12", "13", "15", "20", "24", "25", "26", "29", "32"], "PRI", semaforoPRI)
dictNacional = GeneraDiccionarioPorPartido(["0"], "Nacional", semaforoNacional)

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

with open('COVIDPorPartido.json', 'w') as fp:
    json.dump(diccionarioFinal, fp)