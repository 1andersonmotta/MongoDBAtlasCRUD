const express = require('express')
const app = express()
const mongoose = require('mongoose')
const personRoutes = require('./routes/personRoutes')
require('dotenv').config()

//forma de ler JSON / middleware .use()
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())
app.use('/person', personRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Test Express' })
})

//encodeURIComponent serve para nao quebrar os caracteres especiais 
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_USER = process.env.DB_USER

//mongodb+srv://devandersonmotta:drY2TKFL5jExx78B@apicluster.4spzg7y.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.4spzg7y.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos no MongoDB');
        app.listen(3000)
    })
    .catch((err) => {
        console.log(`Erro: ${err} `);
    })

