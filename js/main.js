const api_key = '262e0c1f-538d-4f3f-86ed-29e15a0ad7d1';
const itemsForPage = 20;
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=${itemsForPage}&page=0`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const API_URL_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;
const container = document.getElementById('container')
const spanError = document.getElementById('error');
let contClick = 0;
let deleteId;

async function loadRandomCats(page = 1)
{
   const response = await fetch(`${API_URL_RANDOM}&page=${page}`);
   const data = await response.json();
   
   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error 1" + response.status;
   }
   
   else 
   {
      container.innerHTML = "";

      for( let i = 0; i < itemsForPage; i++ )
      {
         const item = document.createElement('div');
         const photoCat = document.createElement('img');
         let containerButtonLike = document.createElement('div');
         let buttonLike = document.createElement('div');
         
         item.className = 'item';
         photoCat.className = 'img';
         containerButtonLike.className = 'containerButtonLike';
         buttonLike.className = 'like';
         containerButtonLike.appendChild(buttonLike);
         photoCat.src = data[i].url;
         item.append(photoCat, containerButtonLike);
         container.append(item);
         
         buttonLike.addEventListener('click', ()=>
         {
            if( contClick === 1 )
            {
               contClick = 0;
               buttonLike.classList.remove('is-liked');
               containerButtonLike.style.backgroundColor = '#d34f4f';
               deleteFavoriteCat(deleteId);
            }
            else
            {
               contClick = 1;
               saveFavoriteCat( data[i].id );
               buttonLike.classList.add('is-liked');
               containerButtonLike.style.backgroundColor = 'white';
               console.log(`Guardando contador = ${contClick}`)
            }
         });
      }
      loadFavoriteCat();
   }
}

async function loadFavoriteCat()
{
   const response = await fetch(API_URL_FAVORITES, 
   {
      method: 'GET',
      headers: {
         'X-API-KEY': `${api_key}`
      }
   });
   const data = await response.json();
   
   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error 2" + response.status + data.message;
   }
   else 
   {
      const section = document.getElementById('favoriteCat')
      section.innerHTML = "";
      
      data.forEach(cat =>
      {
         const article = document.createElement('article');
         const img = document.createElement('img');
         const btnDelete = document.createElement('button');
         const imgDelete = document.createElement('img');

         imgDelete.src = 'images/trash.gif';
         imgDelete.className = 'img-delete';
         btnDelete.className = 'btn-delete';
         btnDelete.onclick = () => deleteFavoriteCat(cat.id);
         img.src = cat.image.url;
         btnDelete.appendChild(imgDelete);
         article.className = 'item';
         article.append(img, btnDelete);
         section.appendChild(article);
      })
   }
}

async function saveFavoriteCat(id)
{
   const response = await fetch(API_URL_FAVORITES, 
   {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'X-API-KEY': `${api_key}`
      },
      body: JSON.stringify({
         image_id: id
      }),
   });

   const data = await response.json();

   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error 3" + response.status + data.message;
   }
   else 
   {
      if(contClick === 1)
      {
         console.log(`Michi ${id} guardado en favoritos`);
         deleteId = data.id;
         console.log(`probando: ${deleteId}`)
         loadFavoriteCat();
      }
   }
}

async function deleteFavoriteCat(id)
{
   console.log(`Recibiend este gato: ${id} para eliminar`)
   const response = await fetch(`https://api.thecatapi.com/v1/favourites/${id}`, {
      method: 'DELETE',
      headers: {
         'X-API-KEY': `${api_key}`
      }
   });
   
   const data = await response.json();

   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error 4 " + response.status + data.message;
   }

   else 
   {
      console.log(`Michi ${id} eliminado de favoritos`);
      loadFavoriteCat();
   }
}

async function uploadCatPhoto()
{
   const form = document.getElementById('uploadingForm');
   const formData = new FormData(form);

   console.log(formData.get('file'));
   const response = await fetch(API_URL_UPLOAD, 
   {
      method: 'POST',
      headers: {
         'X-API-KEY': `${api_key}`
      },
      body: formData 
   })

   const data = await response.json();

   if (response.status !== 201) {
      spanError.innerHTML = `Hubo un error al subir la foto 5: ${response.status} ${data.message}`
   }
   else 
   {
      console.log("Foto de michi cargada :)");
      console.log({ data });
      saveFavoriteCat(data.id);
   }
}

loadRandomCats(`${page}`);