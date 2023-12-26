// tag img que tiene evento camara, y se reemplaza por imagen a subir
const imagen = document.querySelector("#img");

function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

if (iOS()) {
    imagen.src = "images/no_disponible.png"
}

// imagen a subir
let imagenASubir

// input para subir imagen en movil
const imagenInputFile = document.querySelector("#uploadImage")
imagenInputFile.hidden = true

const btnCancelar = document.getElementById("cancelar")
btnCancelar.addEventListener("click",()=> window.location.href = "./index.html")

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

if (!iOS()) { //filtro funcionalidad no disponible para iOS
    imagen.addEventListener("click", ()=> imagenInputFile.click())
}

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
    window.scrollTo(0, document.body.scrollHeight);
    return canvas.toDataURL("image/webp")
}

// SUBIR IMAGEN
function postImagen() {
    const nuevaImagen = {
        imagen: imagenASubir,
        fecha: (new Date(Date.now())).toLocaleString(),
        mensaje: inputCaption.value,
        autor: inputFirma.value,
    }

    console.log(JSON.stringify(nuevaImagen))

    if (iOS()) 
    {
        // unreachable: condición previa si iOS => no permite pre-cargar imagen.
        //console.log("iOS device via XMLHttpRequest")
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true)
        
        xhr.setRequestHeader("Content-Type", "text/plain")
        
        xhr.send(`{ 
            "imagen": "${imagenASubir}", 
            "fecha": "${nuevaImagen.fecha}",
            "mensaje": "${nuevaImagen.mensaje}",
            "autor": "${nuevaImagen.autor}"    
            "mode": "cors"
        }`)

        setTimeout(() =>{
            window.location.href = "./index.html"
        }, 3000)

    } else {

        fetch(url, { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nuevaImagen), 
        }) 
        .then((response)=> {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("No se pudo crear el recurso.")
            }
        })
        .then((datos)=> {
            notificarOperacion("Saludo publicado!", "noti-ok")
        })
        .catch((error)=> notificarOperacion("Publicación fallida", "noti-ko"))
    }
    
}

btnPublicar.addEventListener("click", postImagen)

function notificarOperacion(mensaje, cssClass) {
    divNotificaciones.textContent = mensaje
    divNotificaciones.classList.add(cssClass)
    divNotificaciones.style.opacity = "1"
    setTimeout(() => {
        divNotificaciones.style.opacity = "0"
        divNotificaciones.classList.remove(cssClass)
    }, 3000)

    setTimeout(() =>{
        window.location.href = "./index.html"
    }, 3000)
}