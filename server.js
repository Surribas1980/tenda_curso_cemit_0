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
       VerPaxinaTenda,
       BBDD_rexistroUser,
       lerUsuario,
       leoUsuarioLogueado,
       probaLectura
       } = require("./principal-servers/helpers/funciones")
//Ruta estática
const staticRoute = path.join(__dirname,"./imags")
//console.log('staticRoute: ',staticRoute)
//Preparo as peticións
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//parsea solo string
app.use(cors())
app.use(fileUpload())
app.use(express.static(staticRoute))
// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "static")));

//endpoints

  //app.get(endPoints.VerPaxinaContacto,VerPaxinaContacto)
  //app.post(endPoints.VerPaxinaCursos,lerUsuario);
  app.get(endPoints.VerPaxinaCursos,VerPaxinaCursos);
  app.get(endPoints.VerPaxinaSobreNos,VerPaxinaSobreNos);
  app.get(endPoints.VerPaxinaTenda,VerPaxinaTenda);

  /** Usuario */
    /** Rexistro usuario */
    app.post(endPoints.RexistroUser,BBDD_rexistroUser);
    app.get(endPoints.VerPaxinaContacto,VerPaxinaContacto)

    /** Envio datos de usuario logueado */
    app.get(endPoints.userLogueado,leoUsuarioLogueado)
    app.post(endPoints.LoginUser,probaLectura)
//START SERVER
app.listen(3000, messageServerOn);