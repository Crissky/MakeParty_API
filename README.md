# MakeParty API

## API dedicada a APP [MakeParty](https://github.com/InovaUFRPE/MakeParty)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

# Rotas
https://makepartyserver.herokuapp.com

## Usuário (users) - /users


### Criar Usuário Pessoa Jurídica (Anunciante)
#### Método **POST: /users/signup/advertiser**

<br>

Chave | Tipo | Requerimento
------|------|-------------
email | String (teste@teste.com) | Obrigatório
password | String (len >= 6) | Obrigatório
socialname | String | Obrigatório
cnpj | String (len >= 14) | Obrigatório
authorization | String | Opcional
photo | String | Opcional

<br>

**Corpo:**
````javascript
{
  "user":{
    "email": "teste@teste.com",
    "password":"123456"
  },
  "socialname":"Teste INC.",
  "cnpj":"98765432109876",
  "authorization":"Eventos - a5s46as54da6s54d",
  "photo":"photo.jpg"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "active": true,
        "_id": "5bccd414cf399d231000849d",
        "user": "5bccd414cf399d231000849c",
        "socialname": "Teste INC.",
        "cnpj": "98765432109876",
        "authorization": "Eventos - a5s46as54da6s54d",
        "photo": "photo.jpg",
        "createdAt": "2018-10-21T19:31:32.625Z",
        "updatedAt": "2018-10-21T19:31:32.625Z"
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "errmsg": "E11000 duplicate key error index: makepartydb.users.$email_1 dup key: { : \"teste@teste.com\" }"
    }
}
````


### Criar Usuário Pessoa Física (Cliente)
#### Método **POST: /users/signup/customer**

<br>

Chave | Tipo | Requerimento
------|------|-------------
email | String (teste@teste.com) | Obrigatório
password | String (len >= 6) | Obrigatório
name | String | Obrigatório
cpf | String (len >= 11) | Obrigatório
birthdate | Date-String | Obrigatório
phone | String | Obrigatório
photo | String | Opcional

<br>

**Corpo:**
````javascript
{
	"user":{
		"email": "teste2@teste.com",
		"password":"123456"
	},
	"name":"Testeonildo do Teste",
	"cpf":"98765432109",
	"birthdate":"1990-01-02",
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
        "user": "5bccd5c5cf399d231000849f",
        "name": "Testeonildo do Teste",
        "cpf": "98765432109",
        "birthdate": "1990-01-02T00:00:00.000Z",
        "phone": "34333163",
        "photo": "photo.jpg",
        "createdAt": "2018-10-21T19:38:45.931Z",
        "updatedAt": "2018-10-21T19:38:45.931Z"
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "errmsg": "E11000 duplicate key error index: makepartydb.users.$email_1 dup key: { : \"teste2@teste.com\" }"
    }
}
````


### Autenticar Usuário
#### Método **POST: /users/authenticate**

<br>

Chave | Tipo | Requerimento
------|------|-------------
email | String (teste@teste.com) | Obrigatório
password | String (len >= 6) | Obrigatório

<br>

**Corpo:**
````javascript
{ 
  "email": "teste@teste.com", 
  "password": "123456"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmNjZDQxNGNmMzk5ZDIzMTAwMDg0OWQiLCJ1c2VyIjp7Il9pZCI6IjViY2NkNDE0Y2YzOTlkMjMxMDAwODQ5YyIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIn0sImlhdCI6MTU0MDE1MTEyOSwiZXhwIjoxNTQwMjM3NTI5fQ.o9UJuaX3uJL1vW3MxqydUk8QA9PnJS0yL3x7rZHgJrg"
}
````

<br>

**Resposta (ERROR):**
````javascript
[
    {
        "error": "E-mail inválido."
    },
    {
        "error": "Senha deve ter no mínimo 6 caracteres."
    }
]
````

<br>

### Atualizar Token
#### Método **POST: {{URL_BASE/users/refresh-token**

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmNjZDQxNGNmMzk5ZDIzMTAwMDg0OWQiLCJ1c2VyIjp7Il9pZCI6IjViY2NkNDE0Y2YzOTlkMjMxMDAwODQ5YyIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIn0sImlhdCI6MTU0MDE1MTIyOCwiZXhwIjoxNTQwMjM3NjI4fQ.GonXkHkUQNcin23NsssLeorfxpZhFCTJjfsYhLFjHjA"
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Token Inválido"
}
````
