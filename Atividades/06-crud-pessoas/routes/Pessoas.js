const express = require('express')
const router = express.Router()

// lista de pessoas pra simular o banco de dados
let listaPessoas = [
    {
        id: 1,
        nome: "João",
        cpf:"00100100101",
        email:"joão@pedro.com",
        dataNascimento:"01/01/2000"
    },
    {
        id: 2,
        nome: "Maria",
        cpf:"00200200202",
        email:"Maria@Joana.com",
        dataNascimento:"01/01/1998"
    },
]

// mapear as rotas e a lógica
//#Busca
// GET /pessoas
router.get('/pessoas', (req, res, next) => {
    // recebendo o ID como parametro dinâmico
    const id = req.params.id
    // faço a busca na lista de pessoas pelo id recebido
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
    if(!pessoa){
        return res.status(404).json({ error: "Pessoa não encontrada!!!" })
    }
    res.json(listaPessoas)
})


// exportar o roteador
module.exports = router