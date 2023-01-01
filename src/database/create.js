import Pokemon from "../model/Pokemon.js";

const pokemon = new Pokemon();

async function criar(){
    await pokemon.create()
    return
}
criar();