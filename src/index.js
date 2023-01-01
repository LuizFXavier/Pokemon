console.log('Foisss');
import express from "express"
import path, { resolve } from "path";
import router from "./router.js";

const porteiro = process.env.PORT || 8080
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use("/bootstrap", express.static(resolve("./node_modules/bootstrap/dist")))
app.set("views", resolve('./src/views'))
app.set("view engine", "ejs")
app.use("/public", express.static(resolve("./src/public")))

app.listen(porteiro, () => console.log('Rodando')) 