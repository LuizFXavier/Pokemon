import db from "../database/connection.js"
import fs from "fs"
import {resolve} from "path"

class Pokemon{
    async create(){
        await db.query(`
        DROP TABLE public.pokemon;
        CREATE TABLE IF NOT EXISTS public.pokemon
        (
            tipo1 character varying COLLATE pg_catalog."default" NOT NULL,
            tipo2 character varying COLLATE pg_catalog."default",
            "numeroDex" integer NOT NULL,
            especie character varying COLLATE pg_catalog."default" NOT NULL,
            description text COLLATE pg_catalog."default",
            imagem bytea,
            categoria character varying NOT NULL,
            generation integer NOT NULL,

            CONSTRAINT pokemon_pkey PRIMARY KEY ("numeroDex")
        )
        
        TABLESPACE pg_default;
        
        ALTER TABLE IF EXISTS public.pokemon
            OWNER to postgres;
        `).then(()=> console.log("Deu cees"))
        
    }

    async save(pokemon){
        const imagem = fs.readFileSync(resolve(`./src/uploads/${pokemon.especie}.png`))
        await db.query(
            `INSERT INTO public.pokemon(
                tipo1, tipo2, "numeroDex", especie, description, imagem, categoria, generation)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,[pokemon.tipo1, pokemon.tipo2, pokemon.numeroDex, pokemon.especie, pokemon.description, imagem, pokemon.categoria, pokemon.generation]
        )
        fs.unlinkSync(resolve(`./src/uploads/${pokemon.especie}.png`))
    }

    async list(){
        try {
            const pokemons = await db.query(
                `SELECT imagem, especie, "numeroDex",categoria FROM public.pokemon order by "numeroDex"`
            ); 
            return pokemons.rows
        } catch (error) {
            console.log("Erro: ",error);
        }
    }

    async verNumeroDex(numeroDex){
        try {
            const numeros = await db.query(
                `SELECT "numeroDex" FROM public.pokemon WHERE "numeroDex" = ${numeroDex}`
            ); 
            return numeros.rows.length == 0;
        } catch (error) {
            console.log("Erro: ",error);
        }
    }

    async detalhes(numeroDex){
        try {
            const pokemons = await db.query(
                `SELECT * FROM public.pokemon WHERE "numeroDex" = ${numeroDex}`
            ); 
            return pokemons.rows[0]
        } catch (error) {
            console.log("Erro: ",error);
        }
    }
}
export default Pokemon;