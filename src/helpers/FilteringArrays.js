export function eliminaElementosConIDRepetido(lista) {
    let listaFiltrada;
    listaFiltrada = Array.from(new Set(lista.map(a => a.id)))
        .map(id => {
            return lista.find(a => a.id === id)
        })
    return listaFiltrada;
}

export function eliminaElementosConNameRepetido(lista) {
    let listaFiltrada;
    listaFiltrada = Array.from(new Set(lista.map(a => a.name.toLowerCase())))
        .map(name => {
            return lista.find(a => a.name.toLowerCase() === name.toLowerCase())
        })
    return listaFiltrada;
}

export function eliminaElementosRedundantes(lista) {
    lista.map((elemento,index)=>(
        (elemento.name.includes('Instrumental') ||
            elemento.name.includes('Directo') ||
            elemento.name.includes('Remastered') ||
            elemento.name.includes('Remaster') ||
            elemento.name.includes('Versión Maqueta') ||
            elemento.name.includes('Live')
        ) && lista.splice(index, 1)
    ))
    return lista;
}