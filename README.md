# MakeParty API

## API dedicada a APP [MakeParty](https://github.com/InovaUFRPE/MakeParty)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

<br><br>
# Rotas

## Usuário (users) - {{URL_BASE}}/users

### Criar Usuário
#### Método **POST: {{URL_BASE}}/users**

<br>

**Corpo:**
````javascript
{ 
  "email": "teste@teste.com", 
  "password": "123456", 
  "name": "Saci Pererê" 
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "message": "Usuário cadastrado com sucesso!",
    "data": {
        "active": true,
        "_id": "5bc372a59d148f0015752af9",
        "email": "teste@teste.com",
        "name": "Saci Pererê",
        "createAt": "2018-10-14T16:45:25.046Z",
        "__v": 0
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "message": "Falha ao processar requisição.",
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "errmsg": "E11000 duplicate key error index: makepartytest.users.$email_1 dup key: { : \"teste@teste.com\" }"
    }
}
````
<br><br>
### Autenticar Usuário
#### Método **POST: {{URL_BASE}}/users/authenticate**

**Corpo:**
````javascript
{ 
  "email": "teste@teste.com", 
  "password": "123456"
}
````

**Resposta (SUCESSO):**
````javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzJjNTYzNjliZmY4MDAxNTNhNTU1YiIsImVtYWlsIjoicGcyMDA2cGVAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzk1MzU4MTAsImV4cCI6MTUzOTYyMjIxMH0.MMue48mqximv4oG8RHEZ1L1j33uZVuojqoLqVbGXf2U",
    "data": {
        "email": "teste@teste.com"
    }
}
````

**Resposta (ERROR):**
````javascript
[
    {
        "message": "E-mail inválido."
    },
    {
        "message": "Senha deve ter no mínimo 6 caracteres."
    }
]
````
<br><br>
### Atualizar Token
#### Método **POST: {{URL_BASE/users/refresh-token**

**Corpo:**
````javascript
{ 
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzJjNTYzNjliZmY4MDAxNTNhNTU1YiIsImVtYWlsIjoicGcyMDA2cGVAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzk1MzU4MTAsImV4cCI6MTUzOTYyMjIxMH0.MMue48mqximv4oG8RHEZ1L1j33uZVuojqoLqVbGXf2U"
}
````

**Resposta (SUCESSO):**
````javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzJjNTYzNjliZmY4MDAxNTNhNTU1YiIsImVtYWlsIjoicGcyMDA2cGVAaG90bWFpbC5jb20iLCJpYXQiOjE1Mzk1MzU4MTAsImV4cCI6MTUzOTYyMjIxMH0.MMue48mqximv4oG8RHEZ1L1j33uZVuojqoLqVbGXf2U",
    "data": {
        "email": "teste@teste.com"
    }
}
````

**Resposta (ERROR):**
````javascript
{
    "message": "Token Inválido"
}
````
