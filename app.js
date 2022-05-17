const gallery = document.querySelector(".gallery");
const searchinput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

const auth="563492ad6f9170000100000119bbf7bdc696485caf8d235b9f8eb3c0";
let searchvalue;
let page=1;
let currentsearch;
let fetchlink;
//event listeners
searchinput.addEventListener("input",updateinput);
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    currentsearch=searchvalue;

    searchphotos(searchvalue);
});
more.addEventListener("click",loadmore);

function updateinput(e){
    console.log(e.target.value);
    searchvalue=e.target.value;
}
async function fetchapi(url){
const datafetch= await fetch(url,{
    method : 'GET',
    headers : {
        Accept : 'application/json',
        Authorization : auth
    }
    })
    const data = await datafetch.json();
    return data;
}
function generatepictures(data){
    data.photos.forEach(photo =>{
        
        const galleryimg = document.createElement("div");
        galleryimg.classList.add("gallery-img");
        galleryimg.innerHTML = `
        <div class="gallery-info">
        <p> <a href=${photo.photographer_url}> ${photo.photographer}</a></p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
        gallery.appendChild(galleryimg);
    });
}



async function curatedphotos(){
    fetchlink="https://api.pexels.com/v1/curated?per_page=15&page=1";
const data = await fetchapi(fetchlink);
generatepictures(data);
}

async function searchphotos(query){
    clear(); 
    fetchlink=`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data =await fetchapi(fetchlink);
generatepictures(data);
}
function clear(){
    gallery.innerHTML = '';
    searchinput.value = "";
}
async function loadmore(){
page++;
if(currentsearch){
    fetchlink=`https://api.pexels.com/v1/search?query=${currentsearch}+query&per_page=15&page=${page}`;
}
else{
    fetchlink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
}
const data = await fetchapi(fetchlink);
generatepictures(data); 
}
curatedphotos(); 