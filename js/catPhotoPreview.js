const selectFiles = document.querySelector("#selectFiles"),
      catPhotoPreview = document.querySelector("#catPhotoPreview");

selectFiles.addEventListener("change", () => 
{
   const files = selectFiles.files;

   if (!files || !files.length) 
   {
      catPhotoPreview.src = "";
   }

   // Ahora tomamos el primer archivo, el cual vamos a previsualizar
      const firstFile = files[0];
   // Lo convertimos a un objeto de tipo objectURL
      const objectURL = URL.createObjectURL(firstFile);
   // Y a la fuente de la imagen le ponemos el objectURL
      catPhotoPreview.src = objectURL;
      catPhotoPreview.style.display = 'block'
});