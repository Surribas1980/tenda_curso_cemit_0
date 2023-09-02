//necesario
const express = require('express')
const path = require('path')
const app = express();
/////---CONSTANTES---////
const directorioStatico = path.join(__dirname,'../../static/views')

app.use(express.static(directorioStatico))

////
const paxina = {
  contacto: 'contacto.html',
  cursos: 'cursos.html',
  sobrenos:'sobrenos.html',
  tenda:'tenda.html'
}
////

const messageServerOn = function () {
 console.log("Server running");
}
const VerPaxinaContacto = (req,res)=>{
  //res.sendFile(nomeDaPaxina,{root: <carpetaOndeEsta>})
  res.sendFile(paxina.contacto,{root: directorioStatico})
}
const VerPaxinaCursos = (req,res)=>{
  //res.sendFile(nomeDaPaxina,{root: <carpetaOndeEsta>})
  res.sendFile(paxina.cursos,{root: directorioStatico})
}
const VerPaxinaSobreNos= (req,res)=>{
  //res.sendFile(nomeDaPaxina,{root: <carpetaOndeEsta>})
  res.sendFile(paxina.sobrenos,{root: directorioStatico})
}
const VerPaxinaTenda = (req,res)=>{
  //res.sendFile(nomeDaPaxina,{root: <carpetaOndeEsta>})
  res.sendFile(paxina.tenda,{root: directorioStatico})
}
const endPoints = {
  VerPaxinaContacto: '/contacto',
  VerPaxinaCursos:'/cursos',
  VerPaxinaSobreNos:'/sobrenos',
  VerPaxinaTenda:'/tenda'
}
module.exports = {
	messageServerOn,
  endPoints,
  VerPaxinaContacto,
  VerPaxinaCursos,
  VerPaxinaSobreNos,
  VerPaxinaTenda
  }
