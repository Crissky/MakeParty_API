# Rotas - Pessoa Jurídica - Anunciante (advertisers)
## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

https://makepartyserver.herokuapp.com

**Rotas que não são abertas necessitam receber o token de acesso. O Token pode ser passado no Body ou no Header(x-access-token).**

### Atualizar Pessoa Jurídica (Anunciante)
#### Método **PUT: /advertisers**

<br>

Chave | Tipo | Requerimento
------|------|-------------
socialname | String | Obrigatório
cnpj | String (len >= 14) | Obrigatório
authorization | String | Obrigatório
photo | String | Obrigatório

<br>

**Corpo:**
````javascript
{
  "socialname":"Teste Testando",
  "cnpj":"98765432109876",
  "authorization":"13a2sd465asd",
  "photo":"photo2.jpg"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "active": true,
        "_id": "5bccd414cf399d231000849d",
        "user": {
            "_id": "5bccd414cf399d231000849c",
            "email": "teste@teste.com"
        },
        "socialname": "Teste Testando",
        "cnpj": "98765432109876",
        "authorization": "13a2sd465asd",
        "photo": "photo2.jpg",
        "createdAt": "2018-10-21T19:31:32.625Z",
        "updatedAt": "2018-10-21T20:25:11.185Z"
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

### Apagar Pessoa Jurídica (Anunciante)
#### Método **DELETE: /advertisers**

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
        "_id": "5bccd414cf399d231000849d",
        "user": {
            "_id": "5bccd414cf399d231000849c",
            "email": "teste@teste.com"
        },
        "socialname": "Teste Testando",
        "cnpj": "98765432109876",
        "authorization": "13a2sd465asd",
        "photo": "photo2.jpg",
        "createdAt": "2018-10-21T19:31:32.625Z",
        "updatedAt": "2018-10-21T20:31:05.665Z"
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

### Listar Pessoas Jurídica (Anunciante)
#### Método **GET: /advertisers**

<br>

**Resposta (SUCESSO):**
````javascript
[
    {
        "active": true,
        "_id": "5bca1207f9475400159db281",
        "user": {
            "_id": "5bca1207f9475400159db280",
            "email": "pg2006pe@hotmail.com"
        },
        "socialname": "Fagner INC.",
        "cnpj": "12345678901234",
        "authorization": "13a2sd465asd",
        "photo": "photo2.jpg",
        "createdAt": "2018-10-19T17:19:03.698Z",
        "updatedAt": "2018-10-21T20:21:52.813Z"
    },
    {
        "active": true,
        "_id": "5bca1e3cf9475400159db287",
        "user": {
            "_id": "5bca1e3cf9475400159db286",
            "email": "teste@hotmail.com"
        },
        "socialname": "Fagner INC.",
        "cnpj": "12345678901235",
        "authorization": "13a2sd465asd",
        "photo": "photo.jpg",
        "createdAt": "2018-10-19T18:11:08.458Z",
        "updatedAt": "2018-10-19T18:11:08.458Z"
    },
    {
        "active": true,
        "_id": "5bccd414cf399d231000849d",
        "user": {
            "_id": "5bccd414cf399d231000849c",
            "email": "teste@teste.com"
        },
        "socialname": "Teste Testando",
        "cnpj": "98765432109876",
        "authorization": "13a2sd465asd",
        "photo": "photo2.jpg",
        "createdAt": "2018-10-21T19:31:32.625Z",
        "updatedAt": "2018-10-21T20:31:05.665Z"
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

### Pesquisar Pessoa Jurídica pelo ID (Anunciante)
#### Método **GET: /advertisers/:id**

<br>

Parametro | Observação
------|------
ID | O ID deve ser passado no fim da rota.

<br>

**Resposta (SUCESSO):**
````javascript
{
    "active": true,
    "_id": "5bccd414cf399d231000849d",
    "user": {
        "_id": "5bccd414cf399d231000849c",
        "email": "teste@teste.com"
    },
    "socialname": "Teste Testando",
    "cnpj": "98765432109876",
    "authorization": "13a2sd465asd",
    "photo": "photo2.jpg",
    "createdAt": "2018-10-21T19:31:32.625Z",
    "updatedAt": "2018-10-21T20:31:05.665Z"
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Token Inválido"
}
````
