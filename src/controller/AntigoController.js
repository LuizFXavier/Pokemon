app.get('/home', (req, res) => {
    console.log('lol')
    res.status(200).sendFile(path.join(__dirname, '/views/index.html'))
})

app.post('/cadastrar/pokemon', async (req, res) => {
    console.log(req.body);
    try {
        await db.query(
            `INSERT INTO "Pokemon" (
                "dexNumber", specie)
                VALUES (${req.body.dexNumber},'${req.body.specie}');`)
        res.status(200).json({ message: "dale" })
    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})

app.get('/listar/pokemon', async (req, res) =>{
    try {
        const tabela = await db.query(
            `select *from "Pokemon"`
        )
        const monstros = tabela.rows
        const pegar = monstros[2].specie
        console.log(pegar)
        res.status(200).json({ monstros })

    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})

app.post('/imagem', async (req, res) => {
    var ata = fs.readFileSync(resolve('./src/uploads/'))
    try {
        await db.query(
            `INSERT INTO public."Imagem" (image)
             VALUES ($1)`,[ata]
             )
        res.status(200).json({ message: "salvou" })
    } catch (error) {
        res.status(400).json({ error: error.toString() })
    }

})
app.get('/aparecer/imagem', async (req, res) =>{
    try {
        const tabela = await db.query(
            `select *from "Imagem"`
        )
        const monstrar = tabela.rows[0].image.toString("base64")
        
        res.render("index",{monstrar})

    } catch (error) {
        res.status(418).json({ error: error.toString() })
    }
})
app.post("/upload",upload.single("file"), (req, res) =>{
    res.send("Recebido")
})