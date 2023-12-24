const html = document.querySelector("html")

recuperarDeLS()
html.classList.add(actualTheme)

var actualTheme;

const s30era = document.querySelector("#s30era")
const repEra = document.querySelector("#repEra")
const ts1989Era = document.querySelector("#ts1989Era")
const midEra = document.querySelector("#midEra")
const folkEra = document.querySelector("#folkEra")

repEra.addEventListener("click", ()=> setTheme("theme-reputationEra"))
s30era.addEventListener("click", ()=> setTheme("theme-30era"))
ts1989Era.addEventListener("click", ()=> setTheme("theme-1989era"))
midEra.addEventListener("click", ()=> setTheme("theme-midnightsEra"))
folkEra.addEventListener("click", ()=> setTheme("theme-folkloreEra"))


function setTheme(theme) {
    console.log(`nuevo tema seteado: ${theme}`)
    html.classList.remove(actualTheme)
    html.classList.add(theme)
    actualTheme = theme
    almacenarEnLS()
}


function almacenarEnLS() {
    console.log("guardando tema")
    localStorage.setItem("theme", actualTheme)
    console.log(localStorage.getItem("theme"))
}


async function recuperarDeLS() {
if (localStorage.getItem("theme")) {
    actualTheme =  localStorage.getItem("theme")
     
} else {
    actualTheme =  "theme-30era"
    almacenarEnLS()
}
}