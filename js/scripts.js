let pokemonRepository = (function () {

    let pokemonList = []; 

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150' ; 

    let modalContainer = document.querySelector("#modal-container") ; 
   
    function showModal (name , height , imageUrl ) {         
        modalContainer.innerText=" ";               
        let modal = document.createElement("div") ; 
        modal.classList.add("modal");                 

        let closeButtonElement=document.createElement("button"); 
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText= "close"; 
        closeButtonElement.addEventListener("click", hideModal); 

        let titleElement = document.createElement("h1");
        titleElement.innerText = name;

        let contentElement = document.createElement("p"); 
        contentElement.innerText = height ; 
        
        let imageElement = document.createElement("img"); 
        imageElement.classList.add("image");
        imageElement.src = imageUrl;
      
        modal.appendChild(closeButtonElement); 
        modal.appendChild(titleElement) ; 
        modal.appendChild(contentElement) ;
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);  
        
        modalContainer.classList.add("is-visible") ;  
        modalContainer.addEventListener ("click",(e)=>{
            let target=e.target;
            if (target=== modalContainer){
                hideModal();
            }
         });
    }
     function hideModal(){
        modalContainer.classList.remove("is-visible");
     }
     

     window.addEventListener("keydown",(e)=>{
        if(e.key === "Escape" && modalContainer.classList.contains("is-visible")){
            hideModal();
        }
     });

          
function add (pokemon) {
    if (
        typeof pokemon === "object" && 
        pokemon.name && pokemon.detailsUrl 
    ){
        pokemonList.push(pokemon) ;
    } else {
        console.log("pokemon is not correct");
    } 
}

function getAll() {
    return pokemonList ;
}

function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list"); 
    let listpokemon = document.createElement("li"); 
    let button = document.createElement ("button"); 
    button.addEventListener ("click",function(event){
        showDetails(pokemon);
    }) ;  
    button.innerText = pokemon.name ; 
    button.classList.add("button-class"); 
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon) ; 
}

function loadList() {
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        json.results.forEach(function(item){
            let pokemon={
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}

function loadDetails(item) {
    let url=item.detailsUrl;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
        //Now I add the details to the item
        item.imageUrl=details.sprites.front_default;
        item.height=details.height;
        item.types=details.types;
    }).catch(function(e){
        console.error(e);
    });
}

function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function(){
      showModal("Pokemon:" + " " + pokemon.name , "Height:" + " " + pokemon.height , pokemon.imageUrl); 
    });
}

return {
    getAll: getAll , 
    add: add , 
    addListItem: addListItem , 
    loadList: loadList , 
    loadDetails: loadDetails , 
    
};
}) () ;

// created a for loop that iterates over each item in pokemonList
// added a conditional to check if the height is above a certain value, with note “Wow, that’s big!”

/*for (let index=0 ; index < pokemonList.length ; index++ ) {
    if (pokemonList[index].height > 0.5 && pokemonList[index].height < 1.2) {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ")" + "<br>") ;
    }else if (pokemonList[index].height < 0.5) {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ")" + "<br>") ;
    }else {
        document.write(pokemonList[index].name + " (height: " + pokemonList[index].height + ") - Wow, that's big!") 
    }
} 
*/ 

// used a forEach() function instead of the for loop 
// function iterates over each item in pokemonList, prints the details of each item 
// arrow function 

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon) ;   
    }); 
});
