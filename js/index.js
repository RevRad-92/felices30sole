const contenedor = document.querySelector("#contenedor")
const cardDefault = document.querySelector("#defaultCard")
const url = "https://6586271f468ef171392e09a2.mockapi.io/api/v1/images"
const arrayImages = []
const btnCamara = document.querySelector("#camara")


recuperarDeLS()
html.classList.add(actualTheme)
getImages()

function getImages() {    
    fetch(url)
        .then((response)=> {
            if (response.ok) {
                return response.json() 
            }
        })
        .then((data)=> {
            arrayImages.push(...data)
            ordenarPublicaciones()
            showImages()
        })
        .catch((error)=>{
            
            console.error("Se ha producido un error: ", error)
        })
}

function showImages() {
        let html = ""
        if (arrayImages.length !== 0)
        {
            arrayImages.forEach(element => {
        
                let HTMLcardModel = `
                                    <div class="card" id="card${element.id}">
                                        <img src="${element.imagen}" style="width:100%">
                                        <div class="container">
                                        <p>${element.mensaje}</p>
                                        <p style="text-align: right; font-style: italic">${element.autor}</p>
                                        <p style="text-align: center; font-size: 1rem">${element.fecha}</p>
                                    </div>
                                    </div>
                                `    
                html += HTMLcardModel
            });
            contenedor.innerHTML = html
    
        } else {

            html = `
                    <div class="card" id="defaultCard">
                        <a href="/camara.html">
                        <img id="default" src="images/emptyframe_no_messages.jpg" style="width:100%">
                        </a>
                        <div class="container">
                            <h4><b>¡Hacé click en la imagen para publicar un saludo!</b></h4>
                            <p>${(new Date(Date.now())).toLocaleString()}</p>
                        </div>
                    </div>
                `
            contenedor.innerHTML = html

        }
}

function ordenarPublicaciones() {
    arrayImages.sort((a, b)=> {
        if (a.fecha > b.fecha) {
            return -1
        }
        if (a.fecha < b.fecha) {
            return 1
        }
        return 0
    })    
    
}



