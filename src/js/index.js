const nome = document.getElementById('nome')
const imgPokemon = document.getElementById('spr_pokemon');
const input = document.getElementById('input');
const pesq = document.getElementById('pesq');
const btnEsq = document.getElementById('btn_esq');
const btnDir = document.getElementById('btn_dir');
const types = document.getElementById('types');

let searchP = 1;

const fetchPokemon = async (pokemon) =>{
    const apiRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (apiRes.status === 200) {
        const data = await apiRes.json();
        return data;
    }
}

const pokemon =  async (pokemon) => {
    nome.innerHTML = 'loading...';
    const data = await fetchPokemon(pokemon);
    if (data) {
        types.innerHTML = '';
        searchP = data.id;
        imgPokemon.style.display = 'block';
        nome.innerHTML = `${data.id} - ${data.name}`;
        if (data.id >= 650) {
            imgPokemon.src = data.sprites['front_default'];
        }else {
        imgPokemon.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
        }
        for (let i = 0; i < data.types.length; i++) {
        const elementos = document.createElement('span');
        elementos.innerHTML = data.types[i].type.name;
        types.appendChild(elementos)
        }
    } else {
        types.innerHTML = '';
        imgPokemon.style.display = 'none';
        nome.innerHTML = 'Not Found >;c'
    }
}

pesq.addEventListener('click',(evt) => {
    pokemon(input.value.toLowerCase());
    input.value = "";
})

btnDir.addEventListener('click',(evt) => {
    searchP += 1;
    pokemon(searchP);
})

btnEsq.addEventListener('click',(evt) => {
    if (searchP > 1) {
    searchP -= 1;
    pokemon(searchP);
    }
})

pokemon(searchP)

