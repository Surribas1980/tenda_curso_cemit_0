//necesario
const express = require('express')
const path = require('path')
const app = express();
const db = require('../../bd/db.js')
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

const BBDD_rexistroUser = (req, res,next)=>{
  let sampleFile;
  let uploadPath;
  //const db = db.open();
  const body = req.body;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/' + sampleFile.name;
  console.log('uploadPath: ',uploadPath)
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded!');
  });
  if(req.body != undefined){
    

    db.serialize(function (){
          db.run(`INSERT INTO usuarios (dni_cli,pwd_cli,nombre_cli,email_cli) VALUES (?,?,?,?)`,[`${body.dni}`,`${body.pwd}`,`${body.usuario}`,`${body.email}`],
            function (error) {
              if (error) {
                console.error(error.message);
              }
              
            }
          );
        
         db.each(`SELECT * FROM usuarios`, (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          console.log(row);
        },()=>{
          /*res.redirect('/contacto');*/
          
        });//db.each
    });//db.serialize
    res.redirect('/contacto');
    next();
  }
}

const endPoints = {
  VerPaxinaContacto: '/contacto',
  VerPaxinaCursos:'/cursos',
  VerPaxinaSobreNos:'/sobrenos',
  VerPaxinaTenda:'/tenda',
  RexistroUser:'/rexistro'
}
module.exports = {
	messageServerOn,
  endPoints,
  VerPaxinaContacto,
  VerPaxinaCursos,
  VerPaxinaSobreNos,
  VerPaxinaTenda,
  BBDD_rexistroUser
  }
