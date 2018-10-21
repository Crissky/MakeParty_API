# Rotas - Pessoa Física - Cliente (customers)
## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

https://makepartyserver.herokuapp.com

**Rotas que não são abertas necessitam receber o token de acesso. O Token pode ser passado no Body ou no Header.**

### Atualizar Pessoa Física (Cliente)
#### Método **PUT: /customers**

<br>

Chave | Tipo | Requerimento
------|------|-------------
name | String | Obrigatório
cpf | String (len >= 11) | Obrigatório
birthdate | Date-String | Obrigatório
phone | String | Obrigatório
photo | String | Opcional

<br>

**Corpo:**
````javascript
{
	"name":"Teste 2 Testoievski",
	"cpf":"98765432109",
	"birthdate":"1990-01-03",
	"phone":"34333163",
	"photo":"photo.jpg"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "active": true,
        "_id": "5bccd5c5cf399d23100084a0",
        "user": {
            "_id": "5bccd5c5cf399d231000849f",
            "email": "teste2@teste.com"
        },
        "name": "Teste 2 Testoievski",
        "cpf": "98765432109",
        "birthdate": "1990-01-03T00:00:00.000Z",
        "phone": "34333163",
        "photo": "photo.jpg",
        "createdAt": "2018-10-21T19:38:45.931Z",
        "updatedAt": "2018-10-21T20:47:17.063Z"
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": {
        "operationTime": "6614909179607908353",
        "ok": 0,
        "errmsg": "E11000 duplicate key error index: makepartydb.advertisers.$cnpj_1 dup key: { : \"12345678901234\" }",
        "code": 11000,
        "codeName": "DuplicateKey",
        "$clusterTime": {
            "clusterTime": "6614909179607908353",
            "signature": {
                "hash": "g6M7vxlBw5mK1vzvL0gNaGETe78=",
                "keyId": "6614056138973380609"
            }
        },
        "name": "MongoError"
    }
}
````

<br>

### Apagar Pessoa Física (Cliente)
#### Método **DELETE: /customers**

<br>

Chave | Tipo | Requerimento
------|------|-------------
token | String | Obrigatório

<br>

**Corpo:**
````javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmNjZDQxNGNmMzk5ZDIzMTAwMDg0OWQiLCJ1c2VyIjp7Il9pZCI6IjViY2NkNDE0Y2YzOTlkMjMxMDAwODQ5YyIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIn0sImlhdCI6MTU0MDE1MTEyOSwiZXhwIjoxNTQwMjM3NTI5fQ.o9UJuaX3uJL1vW3MxqydUk8QA9PnJS0yL3x7rZHgJrg"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "active": false,
        "_id": "5bccd5c5cf399d23100084a0",
        "user": {
            "_id": "5bccd5c5cf399d231000849f",
            "email": "teste2@teste.com"
        },
        "name": "Teste 2 Testoievski",
        "cpf": "98765432109",
        "birthdate": "1990-01-03T00:00:00.000Z",
        "phone": "34333163",
        "photo": "photo.jpg",
        "createdAt": "2018-10-21T19:38:45.931Z",
        "updatedAt": "2018-10-21T20:51:30.984Z"
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Anunciante não encontrado ou inativo."
}
````

<br>

### Listar Pessoas Física (Cliente)
#### Método **GET: /customers**

<br>

**Resposta (SUCESSO):**
````javascript
[
    {
        "active": true,
        "_id": "5bca0f42f9475400159db27f",
        "user": {
            "_id": "5bca0f42f9475400159db27e",
            "email": "fagner-silva@hotmail.com"
        },
        "name": "Fagner da Silva Cristovam",
        "cpf": "06941674785",
        "birthdate": "1987-12-30T00:00:00.000Z",
        "phone": "34333163",
        "photo": "photo.jpg",
        "createdAt": "2018-10-19T17:07:14.888Z",
        "updatedAt": "2018-10-21T19:12:32.879Z"
    },
    {
        "active": true,
        "_id": "5bccd5c5cf399d23100084a0",
        "user": {
            "_id": "5bccd5c5cf399d231000849f",
            "email": "teste2@teste.com"
        },
        "name": "Testeonildo do Teste",
        "cpf": "98765432109",
        "birthdate": "1990-01-02T00:00:00.000Z",
        "phone": "34333163",
        "photo": "photo.jpg",
        "createdAt": "2018-10-21T19:38:45.931Z",
        "updatedAt": "2018-10-21T19:38:45.931Z"
    }
]
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Token Inválido"
}
````

<br>

### Pesquisar Pessoa Física pelo ID (Cliente)
#### Método **GET: /customers/:id**

<br>

Parametro | Observação
------|------
ID | O ID deve ser passado no fim da rota.

<br>

**Resposta (SUCESSO):**
````javascript
{
    "active": true,
    "_id": "5bccd5c5cf399d23100084a0",
    "user": {
        "_id": "5bccd5c5cf399d231000849f",
        "email": "teste2@teste.com"
    },
    "name": "Teste 2 Testoievski",
    "cpf": "98765432109",
    "birthdate": "1990-01-03T00:00:00.000Z",
    "phone": "34333163",
    "photo": "photo.jpg",
    "createdAt": "2018-10-21T19:38:45.931Z",
    "updatedAt": "2018-10-21T20:51:30.984Z"
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Token Inválido"
}
````
