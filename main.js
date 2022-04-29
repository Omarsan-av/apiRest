const api_key = '262e0c1f-538d-4f3f-86ed-29e15a0ad7d1';
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=10&${api_key}`;
const img = document.getElementsByClassName('img');

// fetch (URL)
//    .then(res => res.json())

//    .then(data =>
//    {
//       const img = document.querySelector('img');
//       img.src = data[0].url;
//    });

async function reload()
{
   const response = await fetch(API_URL);
   const data = await response.json();

   for(let i = 0; i < img.length; i++)
   {
      img[i].src = data[i].url;
      console.log(img.src)
   }
}

reload();