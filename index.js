const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

const lista = ['Java', 'Ketlin', 'Android']

//read all get (personagem)

app.get('/personagem', function(req, res){
    res.send(lista)
})

//Endpoint Read by id [GET] /personagem/id

app.get(`/personagem/:id`, function(req, res){
    const id = req.params.id

    //Acesso item na lista usando id -1
    const item = lista[id - 1]

    //enviamos o item como resposta http://localhost:3000/personagem/1
    res.send(item)
} )

//Sinalizo para express que estamos usando json no body
app.use(express.json())

//endpoint create [POST] /personagem
app.post(`/personagem`, function(req, res){

    //acessamos o body da requisicao
    const body = req.body
		//Acessamos a propriedade `nome` do body
    const novoItem = body.nome
    console.log(body)

    //Adicionamos na lista
		lista.push(novoItem)

    res.send(`Item adicionado com sucesso: `+ novoItem)
})

//endpoint update[put] /personagem/:id
app.put('/personagem/:id', function (req, res) {
  //acessa o id dos parametros de rota
  const id = req.params.id
  //Acessamos o body da requisicao
  const body = req.body
  //acessamos a propridade nome do body
  const novoItem = body.nome
  //atualizamos na lista o novoItem pelo id - 1
  lista[id - 1] = novoItem

  res.send('Item atualizado com sucesso: ' + id + ' - ' + novoItem)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})