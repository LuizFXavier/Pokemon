import Pokemon from "../model/Pokemon.js";

class IndexController{
    async index(req, res){
        const pokemon = new Pokemon();
        const pokemons = await pokemon.list()

        res.render("index", {pokemons})
    }
}

export default new IndexController();