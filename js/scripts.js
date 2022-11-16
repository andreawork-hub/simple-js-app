let pokemonRepository = (function () {

    let pokemonList = []; 

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'





function add (pokemon) {
    if (
        typeof pokemon === "object" && 
        "name" in pokemon 
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

function showDetails(item){
    pokemonRepository.loadDetails(item).then(function(){
      console.log(item) ;   
    });
}

return {
    getAll: getAll , 
    add: add , 
    addListItem: addListItem , 
    loadList: loadList , 
    loadDetails: loadDetails , 
    showDetails: showDetails
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
    }) ;
}) ;  
