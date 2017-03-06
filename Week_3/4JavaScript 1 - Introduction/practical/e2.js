function nonExistentFunc(){
  try{
    zzzzzz();
   }catch (e){
    document.write("Oh shit son!: " + e);
  }
}

nonExistentFunc();