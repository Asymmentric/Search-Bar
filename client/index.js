
const searchBox=document.getElementById('search-input');
const searchBtn=document.getElementById('btnSearch');
const searchRes=document.getElementById('searchRes');

searchBox.addEventListener('keyup',()=>{
    let data={
        value:searchBox.value
    }
    
    if(data.value!==''){
        let xhr=new XMLHttpRequest();
    xhr.open('POST','/search',true);
    xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
    xhr.onload=function(){
        //console.log((JSON.parse(this.response)));
        searchRes.innerHTML="";
        let results=JSON.parse(this.response);
        // console.log(results);
        if(results.length===0){
            searchRes.innerHTML=""
            let noRes=document.createElement('li');
            noRes.setAttribute('disabled','true')
            noRes.innerText='Not here, Try Google';
            searchRes.appendChild(noRes);
        }
        results.forEach( resBeer=> {
           // console.log(resBeer.name);
            let searchVal=document.createElement('li');
            searchVal.style.cursor='pointer';
            // console.log(resBeer);
            searchVal.setAttribute('class','searchList')
            searchVal.setAttribute('id',resBeer.id);
            searchVal.innerText=resBeer.name;
            searchRes.appendChild(searchVal);
            let searchList=document.getElementById(resBeer.id);
            searchList.addEventListener('click',()=>{
                // console.log('clicked ->'+resBeer.id);
                searchBox.value=resBeer.name;
                searchRes.innerHTML="";
            })
        });
    }
    
    xhr.send(JSON.stringify(data))
    
    

    }else{
        searchRes.innerHTML="";
    }
})




const beerlist=document.getElementById('beer-list');

//select 
function fetchBeers() {
    let xhrFetchBeer=new XMLHttpRequest();
    xhrFetchBeer.open('GET','/fetchbeer',false);
    xhrFetchBeer.send();
    return JSON.parse(xhrFetchBeer.response);
}

let fetchedBeers=fetchBeers();
// console.log(fetchedBeers);

fetchedBeers.forEach(key => {
   let option=document.createElement('option');
   option.value=key.id;
   option.innerHTML=key.name;
   beerlist.appendChild(option);
});






const newBeer=document.getElementById('newBeer');
const addBeerBtn=document.getElementById('newBeerBtn');
addBeerBtn.setAttribute('disabled','true');
if(newBeer.value==="" || newBeer.value.trim().length===0){
    addBeerBtn.style.backgroundColor='black';
    addBeerBtn.setAttribute('disabled','true');
    addBeerBtn.style.cursor='default';
    addBeerBtn.style.display='none';
}
document.addEventListener('keyup',()=>{
    if(newBeer.value==="" || newBeer.value.trim().length===0){
        addBeerBtn.style.backgroundColor='black';
        addBeerBtn.setAttribute('disabled','true');
        addBeerBtn.style.cursor='default';
        addBeerBtn.style.display='none';
    }else{
        // console.log(newBeer.value.length);
        addBeerBtn.style.backgroundColor='rgb(124, 124, 196,.4)';
        addBeerBtn.setAttribute('disabled','false');
        addBeerBtn.style.cursor='pointer'
        addBeerBtn.style.display="inline-flex"

    }
})
addBeerBtn.addEventListener('click',()=>{
    // console.log("LIC");
    
        if (addBeerBtn.attributes[1].value==='false') {
            // console.log(newBeer.value.trim());
            let data={
                item:newBeer.value.trim()
            }
            let xhrAdd=new XMLHttpRequest();
            xhrAdd.open('POST','/addbeer',true);
            xhrAdd.setRequestHeader('Content-Type','application/json;charset=utf-8');
            xhrAdd.onload=()=>{
                fetchedBeers=fetchBeers();
                beerlist.innerHTML="";
                fetchedBeers.forEach(key => {
                    let option=document.createElement('option');
                    option.value=key.id;
                    option.innerHTML=key.name;
                    beerlist.appendChild(option);
                    newBeer.value=""
                 });
            }
            xhrAdd.send(JSON.stringify(data))
        }

    
    
})



