//necesario
const express = require('express')
const path = require('path')
const app = express();
const db = require('../../bd/db.js')
/////---CONSTANTES---////
const directorioStatico = path.join(__dirname,'../../static/views')
const staticRoute2 = path.join(__dirname,"../../imags")
/*console.log('staticRoute2: ',staticRoute2)*/
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
const VerPaxinaCursos = (req,res,next)=>{
  //res.sendFile(nomeDaPaxina,{root: <carpetaOndeEsta>})
  res.sendFile(paxina.cursos,{root: directorioStatico})
  //next();
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
  uploadPath = staticRoute2 + '/' + sampleFile.name;
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
const lerUsuario = (req,res,next)=>{
  const body = req.body;
  console.log('req.body: ',req.body)
  if(req.body.hasOwnProperty("user")){
    db.serialize(function (){
          
        
        db.get(`SELECT * FROM usuarios WHERE nombre_cli = ? and pwd_cli = ? and email_cli = ?`,[`${body.user}`,`${body.pwd}`,`${body.email}`], (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          console.log(row);
          let datosSend = {
            nome: row.nombre_cli,
            pwd: row.pwd,
            email: row.email
          }
           console.log('estou en lerUsuario ',datosSend);
            //res.send(datosSend)
           req.datosSend = datosSend;
    
              //next();
         });//db.get
        db.run(`CREATE VIEW IF NOT EXISTS usuarioslogueados as select * from usuarios where nombre_cli = '${body.user}'`,(error)=>{
           if (error) {
            throw new Error(error.message);
          }
          //next();
        })  
        });//db.serialize
  }
  res.redirect('/cursos');
  next();
}
const leoUsuarioLogueado = function(req,res){
  
console.log('está en leoUsuarioLogueado : ');
  
  db.get(`SELECT * FROM usuarioslogueados ORDER BY nome ASC`,(error,row)=>{
    if (error) {
            throw new Error(error.message);
          }
    console.log('está sacando datos: ',row);
          let datosSend = {
            nome: row.user,
            email: row.email
            
          }
    
    res.send(datosSend)
  })
}

const probaLectura = (req,res) => {
  console.log('req.body: ',req.body,'__dirname:',__dirname);
  let usuario = "";
  db.get(`SELECT * FROM usuarios where nombre_cli = ?`,[`${req.body.user}`], (error, row) => {
          if (error) {
            throw new Error(error.message);
          }
          console.log(row);
          res.send(row)
          usuario = row;
          console.log('O usuario: ', usuario)
          
        })
}

const endPoints = {
  VerPaxinaContacto: '/contacto',
  VerPaxinaCursos:'/cursos',
  VerPaxinaSobreNos:'/sobrenos',
  VerPaxinaTenda:'/tenda',
  RexistroUser:'/rexistro',
  LoginUser:'/login',
  userLogueado:'/usuariologueado'
}
module.exports = {
	messageServerOn,
  endPoints,
  VerPaxinaContacto,
  VerPaxinaCursos,
  VerPaxinaSobreNos,
  VerPaxinaTenda,
  BBDD_rexistroUser,
  lerUsuario,
  leoUsuarioLogueado,
  probaLectura
  }
