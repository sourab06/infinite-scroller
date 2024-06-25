const imagecontainer=document.getElementsByClassName('imagecontainer')[0];
var convphoto=[];
var imagesloaded=0;
let ready=false;
var totalimages=0;
var i=0;
 function countcal(){
    if (i==0) 
        return 5;
    else 
    return 30;
    
 }   


function imageloaded(){
    imagesloaded++;
//  console.log('imageloaded', imagesloaded);
if(imagesloaded == totalimages){
   ready= true;
//    console.log('ready=',ready); 

}
}
function displayphotos(){
    imagesloaded=0;
    convphoto=Array.from(convphoto); 
        //remember the above. converting object type to array because .foreach doesn't work for object, convophoto is object type.
        totalimages=convphoto.length;
        // console.log('totalimages',totalimages);
    convphoto.forEach((photo) => {
        const item=document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        img.addEventListener('load', imageloaded());
        item.appendChild(img);
        imagecontainer.appendChild(item);
    });
}

async function getphoto(){
   var count= countcal();
    const apikey='tuGSvM0YDRLKFx9AVlZLfEPjvP9ghowwHQXlxNbsUiU'

const apiurl=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

    // console.log('i=',i);
    i++;
    const getphotos= await fetch(apiurl);
    convphoto= await getphotos.json();
        // console.log(typeof(convphoto));
    displayphotos();
    // console.log(convphoto); 

}

getphoto();

window.addEventListener('scroll',()=>{
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000 && ready) {
        ready=false;
        
               getphoto();
            // console.log('window.innerHieght',window.innerHeight);
            // console.log('window.scrollY',window.scrollY);
            // console.log('window.window.innerHeight+scrollY',window.innerHeight+window.scrollY);
            // console.log('document.body.offsetHeight -1000',document.body.offsetHeight -1000);
            // console.log('load more');
        }
   
});