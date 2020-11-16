# Back-End

## ER Dirgram
 <img alt="MobCar" title="MobCar" src="../README/ERDIAGRAM.png" width="1000px">

## Authentication

### Rota Signup
__Método:POST__

URL:`http://localhost:3333/user/signup`
* Rota recebe através do body da request email(obrigatório) e senha(obrigatório), cpf(obrigatório), numero de telefone(obrigatório) e data de nascimento(obrigatório) cria um registro no banco de dados com o usuario.

```
body da request:
{
"name": "John Lenon",
  "cpf": "000.138.060-50",
  "email": "john@4lenon.com",
  "password": "johnlenon",
  "cellphone": 53984543612,
  "birthdate": "12/12/1900"

}
```
```
response:
{

  "id": "0214785d-2dad-422d-a7ac-10209a457b85",
  "name": "John Lenon",
  "email": "john@4lenon.com",
  "cpf": "000.138.060-50",
  "cellphone": 53984543612,
  "birthdate": "12/12/1900",
  "rents": [],
  "created_at": "14/11/2020",
  "updated_at": "14/11/2020"


}
```
Obs:
1. senha foi ocultada da resposta como forma de aumentar a segurança do usuário.

### Rota Login
__Método:POST__

URL:`http://localhost:3333/user/login`
* Rota recebe através do body da request o email e senha de um usuário e caso o usuário esteja cadastrado ela devolve um token jwt.
```
body da request:
{
	"email": "admin@admin.com",
  "password": "admin"
}
```
```
response:
{
  "user": {
    "id": "8dc82281-9da7-40ed-b978-04122d7260be",
    "name": "admin",
    "email": "admin@admin.com",
    "cpf": "000.138.060-50",
    "cellphone": "53984523422",
    "birthdate": "2020-12-11T03:00:00.000Z",
    "is_Adm": true,
    "rents": [],
    "created_at": "11/12/2020",
    "updated_at": "11/12/2020"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU0NzU2NjAsImV4cCI6MTYwNTQ4Mjg2MCwic3ViIjoiOGRjODIyODEtOWRhNy00MGVkLWI5NzgtMDQxMjJkNzI2MGJlIn0.NjmNVGoWKXPrjutmOd-0ULzFLbChLS0lTx_pjPCePPk"

}
```
Obs:
1. A senha foi ocultada da resposta como forma de aumentar a segurança do usuário.
2. Nesse momento voce terá que alterar o token nas variáveis de ambiente do insomnia(atalho: ctrl + e) para obter acesso às proximas rotas.

## Carros

### Index
__Método:GET__

URL:`http://localhost:3333/car/index`
* Rota para a listagem de carros com ou sem filtros, ela pode ser filtrada, ordenada e paginada atráves dos queryparams. Exemplo:`http://localhost:3333/car/index?pag=desc&category=padrao&model=vectra&max=1`

pag = asc(ordenação alfabética)
pag = desc(ordenação alfabética invertida)
max = maximo de resultados
model = filtra pelo modelo
category = filtra pela categoria do carro
```
response:
{
  [
  {
    "id": 5,
    "model": "Meu Carro",
    "board": "askws764",
    "color": "azul",
    "observations": "escada inclusa",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxl4YsDovxwFpsrQDQ89EqWP86K3DPDnwOOA&usqp=CAU",
    "category": "padrao",
    "rents": [],
    "created_at": "15/11/2020",
    "updated_at": "15/11/2020"
  },
  {
    "id": 8,
    "model": "Carrão",
    "board": "aks764",
    "color": "azul",
    "observations": "escada inclusa",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSC97FReNeGshMqJNzTOp4QpTNy25ecwxZcyg&usqp=CAU",
    "category": "vip",
    "rents": [],
    "created_at": "15/11/2020",
    "updated_at": "15/11/2020"
  }
]
```
Obs:
1. O parametro name da query foi feito com includes para facilitar a busca por nomes.
2. O usuário só pode listar seus próprios Navers.

### Show
__Método:GET__

URL:`http://localhost:3333/car/show/:id`
* Rota recebe através do param id o identificador unico de um carro e retorna o carro de forma detalhada.
URL EXEMPLO:`http://localhost:3333/car/show/1`
```
response:
{
  "id": 5,
  "model": "vectra",
  "board": "alk76464",
  "color": "Vermelho",
  "observations": "zero bala",
  "url": "https://s2.glbimg.com/H1u12Fx5fa3N8mCFpp900sAMa4I=/0x0:1400x720/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2",
  "category": "vip",
  "rents": [
    {
      "id": 16,
      "date_From": "14/11/2020",
      "date_Until": "20/11/2020",
      "price": "2450",
      "user_Id": "2f598258-0005-471b-beb1-ef9a063820dd",
      "car_Id": 5,
      "created_at": "14/11/2020",
      "updated_at": "14/11/2020"
    },
    {
      "id": 17,
      "date_From": "21/11/2020",
      "date_Until": "22/11/2020",
      "price": "700",
      "user_Id": "2f598258-0005-471b-beb1-ef9a063820dd",
      "car_Id": 5,
      "created_at": "14/11/2020",
      "updated_at": "14/11/2020"
    }
  ],
  "created_at": "13/11/2020",
  "updated_at": "13/11/2020"
}

```

 ### AddCar
 __Método:POST__

URL:`http://localhost:3333/car/addcar`
* Recebe atráves do body da request as informações necessárias para criação de um carro.
```
body da request:
{
	  "model":"Carrão",
    "board":"asks764",
    "color":"azul",
    "category":"executivo",
    "observations":"escada inclusa",
	  "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSC97FReNeGshMqJNzTOp4QpTNy25ecwxZcyg&usqp=CAU"
}
```
Obs:
1. a url pode ser enviada vazia ou não enviada
```
response:
{
  "id": 9,
  "model": "Carrão",
  "board": "asks764",
  "color": "azul",
  "observations": "escada inclusa",
  "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSC97FReNeGshMqJNzTOp4QpTNy25ecwxZcyg&usqp=CAU",
  "category": "executivo",
  "rents": [],
  "created_at": "15/11/2020",
  "updated_at": "15/11/2020"
}

```
Obs:
1. Somente o administrador pode adicionar carros

### Update
__Método:PUT__

URL:`http://localhost:3333/car/update/:id`
*Rota recebe através do param id o identificador unico de um carro e através do body da request as informações que deseja alterar de um carro
```
body da request:
{
	  "model":"vectra",
    "board":"",
    "color":"Vermelho",
    "observations":"zero bala",
    "url":"https://s2.glbimg.com/H1u12Fx5fa3N8mCFpp900sAMa4I=/0x0:1400x720/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2"
}
```
Obs:
1. Caso não queria atualizar todas as informações de um carro elas podem ser envidadas iguais as atuais ou não serem enviadas.

2. Somente o administrador pode atualizar carros
```
response:
{
  "id": 5,
  "model": "vectra",
  "board": "askws764",
  "color": "Vermelho",
  "observations": "zero bala",
  "url": "https://s2.glbimg.com/H1u12Fx5fa3N8mCFpp900sAMa4I=/0x0:1400x720/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2",
  "category": "padrao",
  "rents": [
    {
      "id": 1,
      "date_From": "15/11/2020",
      "date_Until": "19/11/2020",
      "price": "499.95",
      "user_Id": "8dc82281-9da7-40ed-b978-04122d7260be",
      "car_Id": 5,
      "created_at": "15/11/2020",
      "updated_at": "15/11/2020"
    }
  ],
  "created_at": "15/11/2020",
  "updated_at": "15/11/2020"
}

```
Obs:
1. Somente o administrador pode atualizar carros

### RentPrice
__Método:POST__

URL:`http://localhost:3333/car/rentprice/:id`
*Rota recebe através do param id o identificador unico de um carro e através do body da request as o periodo que ficará com o carro
```
body da request:
{
      "date_From":"13/11/2020",
      "date_Until":"20/11/2020"
}
```

```
response:
{
  "price": 799.92,
  "diffDays": 8
}

```

### Rent
__Método:POST__

URL:`http://localhost:3333/car/rent/:id`
*Rota recebe através do param id o identificador unico de um carro e através do body da request as o periodo que ficará com o carro e retorna o aluguel feito
```
body da request:
{
      "date_From":"13/11/2020",
      "date_Until":"20/11/2020"
}
```

```
response:
{
  "id": 20,
  "date_From": "21/11/2020",
  "date_Until": "22/11/2020",
  "price": 700,
  "user_Id": "2f598258-0005-471b-beb1-ef9a063820dd",
  "car_Id": "4",
  "created_at": "",
  "updated_at": ""
}

```

### Delete
__Método:DELETE__

URL:`http://localhost:3333/car/delete/:id`
*Rota recebe através do param id o identificador unico(uuid) de um naver e caso o naver exista e seja do usuário retornara carro deletado
```
response:
{
  "message": "Deletado com sucesso"
}
```
Obs:
1. Somente o administrador pode deletar carros
