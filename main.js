const api_key = '262e0c1f-538d-4f3f-86ed-29e15a0ad7d1';
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=10`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${api_key}`;
const imageCat = document.getElementsByClassName('img');
const spanError = document.getElementById('error');
const item = document.getElementsByClassName('item');

// fetch (URL)
//    .then(res => res.json())

//    .then(data =>
//    {
//       const img = document.querySelector('img');
//       img.src = data[0].url;
//    });

async function loadRandomCats()
{
   const response = await fetch(API_URL_RANDOM);
   const data = await response.json();
   
   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error " + response.status;
   }
   
   else 
   {
      for(let i = 0; i < imageCat.length; i++)
      {
         let buttonLike = document.createElement('div');
         buttonLike.className = 'like';
         imageCat[i].src = data[i].url;
         item[i].appendChild(buttonLike);

         buttonLike.addEventListener('click', ()=>
         {
            saveFavoriteCat( data[i].id );
         });
      }
      loadFavoriteCat();

   }
}

async function loadFavoriteCat()
{
   const response = await fetch(API_URL_FAVORITES);
   const data = await response.json();

   console.log('Favoritos');
   console.log(data)

   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error " + response.status + data.message;
   }

   else 
   {
      data.forEach(cat =>
      {
         const section = document.getElementById('favoriteCat')
         const article = document.createElement('article');
         const img = document.createElement('img');
         const btn = document.createElement('button');
         const btnText = document.createTextNode('Eliminar');

         img.src = cat.image.url;
         btn.appendChild(btnText);
         article.append(img, btn);
         section.appendChild(article);
      })


      const favorites = document.getElementsByClassName('like')
   
      for(let i=0; i< favorites.length; i++)
      {
         favorites[i].addEventListener('click', ()=>
         {
            favorites[i].classList.toggle('is-liked');
         });
      }
   }
}

async function saveFavoriteCat(id)
{
   const response = await fetch(API_URL_FAVORITES, 
   {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         image_id: id
      }),
   });

   const data = await response.json();

   if(response.status !== 200)
   {
      spanError.innerHTML = "Hubo un error " + response.status + data.message;
   }
}

loadRandomCats();

