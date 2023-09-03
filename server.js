// Ferramentas core
const readline = require('readline');
let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.on('SIGINT', () => {
  
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      
      process.exit()}
  })
})
//

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload');
//funcións
const {	messageServerOn,
       endPoints,
       VerPaxinaContacto,
       VerPaxinaCursos,
       VerPaxinaSobreNos,
       VerPaxinaTenda
       } = require("./principal-servers/helpers/funciones")

//Preparo as peticións
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//parsea solo string
app.use(cors())
app.use(fileUpload())

// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "static")));

//endpoints

//app.get(endPoints.VerPaxinaContacto,VerPaxinaContacto)
app.get(endPoints.VerPaxinaCursos,VerPaxinaCursos);
app.get(endPoints.VerPaxinaSobreNos,VerPaxinaSobreNos);
app.get(endPoints.VerPaxinaTenda,VerPaxinaTenda);
/** Rexistro usuario */
const db = require('./bd/db.js')
app.post('/rexistro', function(req, res,next) {
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
});
app.get(endPoints.VerPaxinaContacto,VerPaxinaContacto)
//START SERVER
app.listen(3000, messageServerOn);