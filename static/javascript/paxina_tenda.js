usuarios.addEventListener("click",()=>{
  
  let elemento = document.getElementById("navegacion_user")
  if(elemento.style.display == "block"){
    elemento.style.display="none";
  }else{
    elemento.style.display="block";
  }
})