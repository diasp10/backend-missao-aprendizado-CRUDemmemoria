//fix thunderclient http://localhost:3000/personagem/5
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

    //Checamos se o item existe
    if(!item){
      return res.status(404).send('Item não encontrado')
    }
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
    //Checar se o nome esta presente no body
    if (!novoItem){
      return res.status(400).send(`Corpo da requisicao deve estar presente no body`)
    }
    //Checar se o novo item esta presente ou nao
    if(lista.includes(novoItem)){
      return res.status(409).send(`Esse item ja existe na lista`)
    }

    //Adicionamos na lista
		lista.push(novoItem)

    res.status(201).send(`Item adicionado com sucesso: `+ novoItem)
})

//endpoint update[put] /personagem/:id
app.put('/personagem/:id', function (req, res) {
  //acessa o id dos parametros de rota
  const id = req.params.id
  //Checamos se o item do id -1 esta na lista exisbe mensagem caso nao esteja
  if(!lista[id-1]){
    return res.status(404).send('Item não encontrado')
  }
  //Acessamos o body da requisicao
  const body = req.body
  //acessamos a propridade nome do body
  const novoItem = body.nome
  //atualizamos na lista o novoItem pelo id - 1
  lista[id - 1] = novoItem

  if (!novoItem){
    return res.status(400).send(`Corpo da requisicao deve estar presente no body`)
  }
  //Checar se o novo item esta presente ou nao
  if(lista.includes(novoItem)){
    return res.status(409).send(`Esse item ja existe na lista`)
  }

  res.status(201).send('Item atualizado com sucesso: ' + id + ' - ' + novoItem)
})

app.delete('/personagem/:id', function (req, res){
  //Acessando parametros de rota
  const id = req.params.id
  //Checamos se o item do id -1 esta na lista exisbe mensagem caso nao esteja
  if(!lista[id-1]){
    return res.status(404).send('Item não encontrado')
  }
  //Remoter itenm da lista usando o id-1
  delete lista[id - 1]
  res.send(`Item removido com sucesso: ` + id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})