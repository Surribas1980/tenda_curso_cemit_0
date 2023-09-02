contacto.addEventListener('click',()=>{
  location.replace('/contacto')
})

tenda.addEventListener('click',()=>{
  location.replace('/tenda')
})

cursos.addEventListener('click',()=>{
  location.replace('/cursos')
})

sobreNos.addEventListener('click',()=>{
  location.replace('/sobrenos')
})

home.addEventListener('click',(event)=>{
  location.replace('/');
  console.log('event: ',event)
  //event.target.classList.toggle("colores")
})


show_menu.addEventListener("click",function(){
  if( menu.style.display == "block"){
   menu.style.display="none";
  }else{
    menu.style.display="block";
  }
  
})


