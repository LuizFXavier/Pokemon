import { Router } from "express";
import indexController from "./controller/IndexController.js";
import pokemonController from "./controller/PokemonController.js";
import upload from "./upload.js";

const router = Router();
router.get("/", indexController.index)
router.get("/cadastro/pokemon", pokemonController.cadastro)
router.get("/detalhes/pokemon/:numeroDex", pokemonController.detalhes)
router.post("/salvar/pokemon", upload.single("imagem"), pokemonController.salvar)

export default router;
