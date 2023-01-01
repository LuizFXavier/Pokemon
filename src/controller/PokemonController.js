import Pokemon from "../model/Pokemon.js";
import fs from "fs"
import {resolve} from "path"

class PokemonController{
    cadastro(req, res){
        const tipos = [
            "Normal","Fogo","Água",
            "Grama","Voador","Lutador",
            "Fantasma","Elétrico","Venenoso",
            "Inseto","Dark","Aço",
            "Gelo", "Fada", "Dragão",
            "Psíquico","Ground","Pedra"]

        res.render("cadastro", {tipos, error:false}) 
    }
    async salvar(req, res){
        const pokemon = new Pokemon();

        const tipos = [
            "Normal","Fogo","Água",
            "Grama","Voador","Lutador",
            "Fantasma","Elétrico","Venenoso",
            "Inseto","Dark","Aço",
            "Gelo", "Fada", "Dragão",
            "Psíquico","Ground","Pedra"]

        if (await pokemon.verNumeroDex(req.body.numeroDex)) {
            
            await pokemon.save(req.body)
            return res.redirect("/")
            
        }
        fs.unlinkSync(resolve(`./src/uploads/${req.body.especie}.png`))
        return res.render("cadastro", {tipos, error:"Número de pokedex já utilizado"});
    }
    async detalhes(req, res){
        console.log(req.params.numeroDex);
        const pokemon = await new Pokemon().detalhes(req.params.numeroDex)
        console.log(pokemon)
        res.render("detalhes", {pokemon})
    }
}

export default new PokemonController();