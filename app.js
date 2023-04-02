const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

class Usuario{
    constructor(cpf, nome, dataNasc){
        this.cpf = cpf
        this.nome = nome
        this.dataNasc = new Date(dataNasc)
    }
}

const dbUsuarios = []

app.get('/usuario/:cpf', (req, res) => {
    const id = dbUsuarios.findIndex(usuario => usuario.cpf == req.params.cpf)

    if(id === -1)
        return res.status(400).send('Usuário não encontrado!')

    return res.json(dbUsuarios[id])
})

app.post('/usuario', (req, res) => {
    const {cpf, nome, data} = req.body

    const usuario = new Usuario(cpf, nome, data)

    if(cpf === undefined)
        return res.status(400).send('Entrada invalida!')
    
    const id = dbUsuarios.findIndex(usuario => usuario.cpf == cpf)

    if(id === -1){
        dbUsuarios.push(usuario)
        return res.json(dbUsuarios)
    }
    
    return res.status(400).send('Usuário já existe')
})

app.listen(3030, () => console.log('Servidor rodando na porta 3030'))