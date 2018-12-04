# Rotas - Notificações (notification)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

<https://makepartyserver.herokuapp.com>

**Rotas que não são abertas necessitam receber o token de acesso. O Token pode ser passado no Body ou no Header(x-access-token).**

<br>

### Criar Notificação

#### Método **POST: /notifications**

<br>

Chave   | Tipo   | Requerimento
------- | ------ | ------------
message | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "message": "O anunciante respondeu a sua pergunta."
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "active": true,
        "_id": "5c0571d51078cc3fa8ba33d2",
        "message": "O anunciante respondeu a sua pergunta.",
        "user": "5bca0f42f9475400159db27e",
        "createdAt": "2018-12-03T18:11:33.626Z",
        "updatedAt": "2018-12-03T18:11:33.626Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Campo 'message' não informado."
}
```

<br>

### Atualizar Notificação

#### Método **PUT: /notifications**

<br>

Chave   | Tipo   | Requerimento
------- | ------ | ------------
_id     | String | Obrigatório
message | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5c0571d51078cc3fa8ba33d2",
    "message": "O anunciante respondeu a sua pergunta. Atualizado"
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "active": true,
        "_id": "5c0571d51078cc3fa8ba33d2",
        "message": "O anunciante respondeu a sua pergunta. Atualizado",
        "user": {
            "active": true,
            "_id": "5bca0f42f9475400159db27e",
            "email": "fagner-silva@hotmail.com",
            "createdAt": "2018-10-19T17:07:14.841Z",
            "updatedAt": "2018-10-19T17:07:14.841Z"
        },
        "createdAt": "2018-12-03T18:11:33.626Z",
        "updatedAt": "2018-12-03T18:26:05.049Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Notificação não encontrada."
}
```

<br>

### Apagar Notificação

#### Método **DELETE: /notifications**

<br>

Chave | Tipo   | Requerimento
----- | ------ | ------------
_id   | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5c0571d51078cc3fa8ba33d2"
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "active": false,
        "_id": "5c0571d51078cc3fa8ba33d2",
        "message": "O anunciante respondeu a sua pergunta. Atualizado",
        "user": {
            "active": true,
            "_id": "5bca0f42f9475400159db27e",
            "email": "fagner-silva@hotmail.com",
            "createdAt": "2018-10-19T17:07:14.841Z",
            "updatedAt": "2018-10-19T17:07:14.841Z"
        },
        "createdAt": "2018-12-03T18:11:33.626Z",
        "updatedAt": "2018-12-03T18:28:40.054Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Notificação não encontrada ou não pertence a este Usuário."
}
```

<br>

### Buscar Notificação pelo ID do Usuário

#### Método **GET: /notifications/users**

<br>

Query | Observação                                                             | Requerimento
----- | ---------------------------------------------------------------------- | ------------
limit | Número máximo de itens retornados                                      | Opcional
page  | Número da página. Número de itens ignorados com base no (limit * page) | Opcional

<br>

**Resposta (SUCESSO):**

```javascript
{
    "notifications": [
        {
            "active": true,
            "_id": "5c057653f556f62dc8872080",
            "message": "O anunciante respondeu a sua pergunta. Venha MakeParty.",
            "user": {
                "active": true,
                "_id": "5bca0f42f9475400159db27e",
                "email": "fagner-silva@hotmail.com",
                "createdAt": "2018-10-19T17:07:14.841Z",
                "updatedAt": "2018-10-19T17:07:14.841Z"
            },
            "createdAt": "2018-12-03T18:30:43.728Z",
            "updatedAt": "2018-12-03T18:30:43.728Z"
        },
        {
            "active": true,
            "_id": "5c05767bf556f62dc8872081",
            "message": "Estamos com saudades. Qual tal MakeParty?",
            "user": {
                "active": true,
                "_id": "5bca0f42f9475400159db27e",
                "email": "fagner-silva@hotmail.com",
                "createdAt": "2018-10-19T17:07:14.841Z",
                "updatedAt": "2018-10-19T17:07:14.841Z"
            },
            "createdAt": "2018-12-03T18:31:23.198Z",
            "updatedAt": "2018-12-03T18:31:23.198Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Usuário não autorizado ou desativado."
}
```

<br>
