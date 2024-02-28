const fs = require ("fs")

function getDatos(ruta) {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf8'))
    } else {
        return []
    }

}

function saveDatos (ruta, datos) {
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 5),
)}

module.exports={getDatos, saveDatos}