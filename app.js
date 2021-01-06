const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//Array Constructor com 150 elementos preenchidos com undefined por causa do método fill
// pois o constructor levanta 150 elementos porém eles não são visíveis

//(underline) no método .map porque eu não vou usar o primeiro parâmetro
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>

    //método fetch retorna uma promisses
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeinfo => typeinfo.type.name)

    accumulator += `
            <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
            <h2 class"card-title">${id}. ${name}</h2>
            <p class"card-subtitle">${elementTypes.join(' | ')}</p> 
            </li>
            `
    return accumulator
}, '')

const insertePokemonsintoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

//Array de promises
const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertePokemonsintoPage)

