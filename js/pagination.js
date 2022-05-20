const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');
let page = 1;

btnPrevious.addEventListener('click', () => 
{
   if(page > 1)
   {
      page -= 1;
		loadRandomCats(`${page}`);
      console.log(`Estamos en la página ${page}`)
	}
});

btnNext.addEventListener('click', ()=> 
{
   if(page < 559)
   {
      page +=1;
      loadRandomCats(`${page}`);
      console.log(`Estamos en la página ${page}`)
   }
})