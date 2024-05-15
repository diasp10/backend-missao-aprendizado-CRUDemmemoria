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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})