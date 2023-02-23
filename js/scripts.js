let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h5>" + "Pokemon:" + " " + item.name + "</h5>");
        let heightElement = $("<p>" + "Height:" + " " + item.height + " " + "cm" + "</p>");
        let weightElement = $("<p>" + "Weight:" + " " + item.weight + " " + "g" + "</p>");
        let typesElement = $("<p>" + "Types:" + " " + item.types + " " + "</p>");
        let abilitiesElement = $("<p>" + "Abilities:" + " " + item.abilities + " " + "</p>");
        let imageElementFront = $('<img class="modal-img" style="width:40%">').attr("src", item.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:40%">').attr("src", item.imageUrlBack);

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            pokemon.name && pokemon.detailsUrl
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            let pokemonList = $(".pokemon-list");
            let listpokemon = $('<li class="list-group-item" style="border: none"></li>');
            let liCard = $('<div class="card align-items-center justify-content-center bg-dark" style="width:250px ; border: 1px solid red ; border-radius:100% ; height:250px"></div>');
            let button = $('<button type="button" class="pokemon-button btn btn-danger" data-toggle="modal" data-target="#pokemonModal">Details </button>');
            button.on("click", function (e) {
                showDetails(pokemon)
            });
            let liTitle = $('<h5 class="li-title; text-uppercase">' + pokemon.name + '</h5>').attr('style', 'text-align: center ; color:white');
            let liImage = $('<img class="card-image" style="width:50%">').attr('src', pokemon.imageUrlFront);

            liCard.append(liImage);
            liCard.append(liTitle);
            liCard.append(button);
            listpokemon.append(liCard);
            pokemonList.append(listpokemon);

        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                //console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //const searchBtn = document.getElementById('search-button');
    const searchPokemon = document.getElementById('search-pokemon');
    searchPokemon.addEventListener('keyup', (e) => {
        e.preventDefault();
        const pokemonListItems = document.querySelectorAll('.list-group-item');
        const filterValue = e.target.value.toLowerCase();
        pokemonListItems.forEach(function (item) {
            if (item.innerText.toLowerCase().indexOf(filterValue) > -1) {
                item.style.display = "";
            } else {
                item.style.display = 'none';
            }
        });
    })

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Now I add the details to the item
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.types = details.types.map((type) => type.type.name);
            item.abilities = details.abilities.map((abilities) => abilities.ability.name)
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

// used a forEach() function instead of the for loop 
// function iterates over each item in pokemonList, prints the details of each item 
// arrow function 

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
