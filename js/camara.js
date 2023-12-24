// tag img que tiene evento camara, y se reemplaza por imagen a subir
const imagen = document.querySelector("#img");

// imagen a subir
let imagenASubir

// input para subir imagen en movil
const imagenInputFile = document.querySelector("#uploadImage")
imagenInputFile.hidden = true



const btnPublicar = document.getElementById("publicar")
btnPublicar.disabled = true

const url = "https://6586271f468ef171392e09a2.mockapi.io/api/v1/images"

// input para mensaje
const inputCaption = document.querySelector("#caption")
inputCaption.hidden = true
const inputFirma = document.querySelector("#firma")
inputFirma.hidden = true


const divNotificaciones = document.querySelector("div#notificaciones")
divNotificaciones.style.opacity = "0"

recuperarDeLS()
html.classList.add(actualTheme)

imagen.addEventListener("click", ()=> imagenInputFile.click())

// muestra imagen capturada
imagenInputFile.addEventListener("change", ()=> {

        
        imagen.src = URL.createObjectURL(imagenInputFile.files[0]) 

        inputCaption.hidden = false
        inputFirma.hidden = false
        btnPublicar.disabled = false

        imagen.addEventListener("load", ()=> {
            imagenASubir = crearCanvasDeImagen()
            console.log(imagenASubir) 
            
    })
})

// convierte BLOB a Base64 (para subir a api)
function crearCanvasDeImagen() {
    const canvas = document.createElement("canvas")
    canvas.hidden = true
    const ctx = canvas.getContext("2d")
    canvas.width = imagen.width
    canvas.height = imagen.height
    ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height) 
    document.querySelector("body").appendChild(canvas)
    return canvas.toDataURL("image/webp")
}


// SUBIR IMAGEN
function postImagen() {
    const nuevaImagen = {
        imagen: imagenASubir,
        fecha: (new Date(Date.now())).toLocaleString(),
        mensaje: inputCaption.value,
        autor: inputFirma.value
    }

    fetch(url, { 
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(nuevaImagen) 
    }) 
    .then((response)=> {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("No se pudo crear el recurso.")
        }
    })
    .then((datos)=> {
        notificarOperacion("Imagen publicada!", "noti-ok")
    })
    .catch((error)=> notificarOperacion("Publicación fallida", "noti-ko"))
}

btnPublicar.addEventListener("click", postImagen)


function notificarOperacion(mensaje, cssClass) {
    divNotificaciones.textContent = mensaje
    divNotificaciones.classList.add(cssClass)
    divNotificaciones.style.opacity = "1"
    
    divNotificaciones.style.opacity = "0"
    divNotificaciones.classList.remove(cssClass)
    
    window.location.href = "./index.html"
    
    // setTimeout(() => {
    //     divNotificaciones.style.opacity = "0"
    //     divNotificaciones.classList.remove(cssClass)
    // }, 3000)

    // setTimeout(() =>{
    //     window.location.href = "./index.html"
    // }, 3000)
}