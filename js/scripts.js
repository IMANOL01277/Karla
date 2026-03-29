let clientes=JSON.parse(localStorage.getItem("clientes"))||[]
let citas=JSON.parse(localStorage.getItem("citas"))||[]
let pagos=JSON.parse(localStorage.getItem("pagos"))||[]
let inventario=JSON.parse(localStorage.getItem("inventario"))||[]

function mostrar(id){
document.querySelectorAll("section").forEach(s=>{
s.classList.remove("activo")
})
document.getElementById(id).classList.add("activo")
}

function guardar(){
localStorage.setItem("clientes",JSON.stringify(clientes))
localStorage.setItem("citas",JSON.stringify(citas))
localStorage.setItem("pagos",JSON.stringify(pagos))
localStorage.setItem("inventario",JSON.stringify(inventario))
}

function agregarCliente(){
let nombre=document.getElementById("nombreCliente").value
let telefono=document.getElementById("telefonoCliente").value
clientes.push({nombre,telefono})
guardar()
render()
}

function agregarCita(){

let cliente=document.getElementById("clienteCita").value
let servicio=document.getElementById("servicioCita").value
let fecha=document.getElementById("fechaCita").value
let hora=document.getElementById("horaCita").value
let lugar=document.getElementById("lugarCita").value

citas.push({cliente,servicio,fecha,hora,lugar})

guardar()
render()
}

function agregarPago(){
let cliente=document.getElementById("clientePago").value
let monto=parseInt(document.getElementById("montoPago").value)
let tipo=document.getElementById("tipoIngreso").value
pagos.push({cliente,monto,tipo})
guardar()
render()
}

function agregarInventario(){
let producto=document.getElementById("productoInventario").value
let cantidad=document.getElementById("cantidadInventario").value
inventario.push({producto,cantidad})
guardar()
render()
}

function eliminar(tipo,index){
if(tipo=="cliente")clientes.splice(index,1)
if(tipo=="cita")citas.splice(index,1)
if(tipo=="pago")pagos.splice(index,1)
if(tipo=="inventario")inventario.splice(index,1)
guardar()
render()
}

function render(){

let tc=document.getElementById("tablaClientes")
tc.innerHTML=""
clientes.forEach((c,i)=>{
tc.innerHTML+=`<tr>
<td>${c.nombre}</td>
<td>${c.telefono}</td>
<td><button onclick="eliminar('cliente',${i})">Eliminar</button></td>
</tr>`
})

let tci=document.getElementById("tablaCitas")
tci.innerHTML=""
citas.forEach((c,i)=>{
tci.innerHTML+=`<tr>
<td>${c.cliente}</td>
<td>${c.servicio}</td>
<td>${c.fecha}</td>
<td>${c.hora}</td>
<td>${c.lugar}</td>
<td><button onclick="eliminar('cita',${i})">Eliminar</button></td>
</tr>`
})

document.getElementById("totalClientes").innerText=clientes.length
document.getElementById("totalCitas").innerText=citas.length

}

function login(){

let usuario=document.getElementById("usuario").value
let clave=document.getElementById("clave").value

if(usuario=="manicurista" && clave=="1234"){
alert("Bienvenida Manicurista")
mostrar("inventario")
}else{
alert("Datos incorrectos")
}

}

render()