# Rotas - Anúncios (ads)
## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

https://makepartyserver.herokuapp.com

<br>

### Criar Anúncio
#### Método **POST: /ads**

<br>

Chave | Tipo | Requerimento
------|------|-------------
title | String | Obrigatório
description | String | Opcional
price | Number | Opcional
type | String | Obrigatório
phone | String | Opcional
tags | StringList | Opcional
photos | StringList | Opcional

<br>

**Corpo:**
````javascript
{
	"title": "Calourada Top 2018 UFRPE",
	"description": "Festa muito topzera 2018 UFRPE",
	"price": 150,
	"type": "Festa",
	"phone":"89452639",
	"tags": ["Festa", "Top", "UFRPE"],
	"photos": ["Foto.jpg", "Capa.jpg"]
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "description": "Festa muito topzera 2018 UFRPE",
        "price": 150,
        "tags": [
            "festa",
            "top",
            "ufrpe"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccead527f08c25fcedd3ba",
        "title": "Calourada Top 2018 UFRPE",
        "type": "Festa",
        "phone": "89452639",
        "owner": "5bccd414cf399d231000849d",
        "createdAt": "2018-10-21T21:08:37.235Z",
        "updatedAt": "2018-10-21T21:08:37.235Z"
    }
}
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Token Inválido"
}
````

<br>

### Atualizar Anúncio
#### Método **PUT: /ads**

<br>

Chave | Tipo | Requerimento
------|------|-------------
\_id | String | Obrigatório
title | String | Obrigatório
description | String | Obrigatório
price | Number | Obrigatório
type | String | Obrigatório
phone | String | Obrigatório
tags | StringList | Obrigatório
photos | StringList | Obrigatório

<br>

**Corpo:**
````javascript
{
	"_id": "5bccead527f08c25fcedd3ba",
	"title": "Festa Best Topzera 2018 22",
	"description": "Festa muito top...",
	"price": 400,
	"type": "Festa",
	"phone":"89452639",
	"tags": ["FESTA", "Topzera", "BEST", "Bebidas"],
	"photos": ["Foto.jpg", "Capa.jpg"]
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "description": "Festa muito top...",
        "price": 400,
        "tags": [
            "FESTA",
            "Topzera",
            "BEST",
            "Bebidas"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccead527f08c25fcedd3ba",
        "title": "Festa Best Topzera 2018 22",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bccd414cf399d231000849d",
            "user": "5bccd414cf399d231000849c",
            "socialname": "Teste Testando",
            "cnpj": "98765432109876",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-21T19:31:32.625Z",
            "updatedAt": "2018-10-21T20:31:05.665Z"
        },
        "createdAt": "2018-10-21T21:08:37.235Z",
        "updatedAt": "2018-10-21T21:12:27.608Z"
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Anuncio não encontrado ou não pertence a este Usuário."
}
````

<br>

### Apagar Anúncio
#### Método **DELETE: /ads**

<br>

Chave | Tipo | Requerimento
------|------|-------------
\_id | String | Obrigatório

<br>

**Corpo:**
````javascript
{
	"_id": "5bccead527f08c25fcedd3ba"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "description": "Festa muito top...",
        "price": 400,
        "tags": [
            "FESTA",
            "Topzera",
            "BEST",
            "Bebidas"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": false,
        "_id": "5bccead527f08c25fcedd3ba",
        "title": "Festa Best Topzera 2018 22",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bccd414cf399d231000849d",
            "user": "5bccd414cf399d231000849c",
            "socialname": "Teste Testando",
            "cnpj": "98765432109876",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-21T19:31:32.625Z",
            "updatedAt": "2018-10-21T20:31:05.665Z"
        },
        "createdAt": "2018-10-21T21:08:37.235Z",
        "updatedAt": "2018-10-21T21:15:24.635Z"
    }
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Anuncio não encontrado ou não pertence a este Usuário."
}
````

<br>

### Listar Anúncios - ROTA ABERTA (NÃO NECESSITA DE TOKEN)
#### Método **GET: /ads**

<br>

**Resposta (SUCESSO):**
````javascript
[
    {
        "description": "Festa muito topzera 2018 UFRPE",
        "price": 150,
        "tags": [
            "festa",
            "top",
            "ufrpe"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccc9890a6229312442519c",
        "title": "Calourada Top 2018 UFRPE",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bca1207f9475400159db281",
            "user": "5bca1207f9475400159db280",
            "socialname": "Fagner INC.",
            "cnpj": "12345678901234",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-19T17:19:03.698Z",
            "updatedAt": "2018-10-21T20:21:52.813Z"
        },
        "createdAt": "2018-10-21T18:46:33.825Z",
        "updatedAt": "2018-10-21T18:46:33.825Z"
    },
    {
        "description": "Festa muito topzera 2018 UFRPE",
        "price": 150,
        "tags": [
            "festa",
            "top",
            "ufrpe"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccc9b30b0a3715b4a07b38",
        "title": "Calourada Top 2018 UFRPE",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bca1207f9475400159db281",
            "user": "5bca1207f9475400159db280",
            "socialname": "Fagner INC.",
            "cnpj": "12345678901234",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-19T17:19:03.698Z",
            "updatedAt": "2018-10-21T20:21:52.813Z"
        },
        "createdAt": "2018-10-21T18:47:15.622Z",
        "updatedAt": "2018-10-21T18:47:15.622Z"
    },
    {
        "description": "Festa muito top...",
        "price": 400,
        "tags": [
            "FESTA",
            "Topzera",
            "BEST",
            "Bebidas"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccca0821a0c4057cd1eaf4",
        "title": "Festa Best Topzera 2018 22",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bca1207f9475400159db281",
            "user": "5bca1207f9475400159db280",
            "socialname": "Fagner INC.",
            "cnpj": "12345678901234",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-19T17:19:03.698Z",
            "updatedAt": "2018-10-21T20:21:52.813Z"
        },
        "createdAt": "2018-10-21T18:48:40.472Z",
        "updatedAt": "2018-10-21T18:55:09.348Z"
    },
    {
        "description": "Festa muito topzera 2018 UFRPE",
        "price": 150,
        "tags": [
            "festa",
            "top",
            "ufrpe"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccead527f08c25fcedd3ba",
        "title": "Calourada Top 2018 UFRPE",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bccd414cf399d231000849d",
            "user": "5bccd414cf399d231000849c",
            "socialname": "Teste Testando",
            "cnpj": "98765432109876",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-21T19:31:32.625Z",
            "updatedAt": "2018-10-21T20:31:05.665Z"
        },
        "createdAt": "2018-10-21T21:08:37.235Z",
        "updatedAt": "2018-10-21T21:08:37.235Z"
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

### Pesquisar Anúncio pelo ID - ROTA ABERTA (NÃO NECESSITA DE TOKEN)
#### Método **GET: /ads/:id**

<br>

Parametro | Observação
------|------
ID | O ID deve ser passado no fim da rota.

<br>

**Resposta (SUCESSO):**
````javascript
{
    "description": "Festa muito topzera 2018 UFRPE",
    "price": 150,
    "tags": [
        "festa",
        "top",
        "ufrpe"
    ],
    "photos": [
        "Foto.jpg",
        "Capa.jpg"
    ],
    "active": true,
    "_id": "5bccc9890a6229312442519c",
    "title": "Calourada Top 2018 UFRPE",
    "type": "Festa",
    "phone": "89452639",
    "owner": {
        "active": true,
        "_id": "5bca1207f9475400159db281",
        "user": "5bca1207f9475400159db280",
        "socialname": "Fagner INC.",
        "cnpj": "12345678901234",
        "authorization": "13a2sd465asd",
        "photo": "photo2.jpg",
        "createdAt": "2018-10-19T17:19:03.698Z",
        "updatedAt": "2018-10-21T20:21:52.813Z"
    },
    "createdAt": "2018-10-21T18:46:33.825Z",
    "updatedAt": "2018-10-21T18:46:33.825Z"
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"5bccc9890a6229312442519cs\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"5bccc9890a6229312442519cs\"",
        "kind": "ObjectId",
        "value": "5bccc9890a6229312442519cs",
        "path": "_id"
    }
}
````

<br>

### Listar Anúncios pela TAG - ROTA ABERTA (NÃO NECESSITA DE TOKEN)
#### Método **GET: /tags/:tag**

<br>

Parametro | Observação
------|------
TAG | A TAG deve ser passada no fim da rota.

<br>

**Resposta (SUCESSO):**
````javascript
[
    {
        "description": "Festa muito topzera 2018 UFRPE",
        "price": 150,
        "tags": [
            "festa",
            "top",
            "ufrpe"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccc9890a6229312442519c",
        "title": "Calourada Top 2018 UFRPE",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bca1207f9475400159db281",
            "user": "5bca1207f9475400159db280",
            "socialname": "Fagner INC.",
            "cnpj": "12345678901234",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-19T17:19:03.698Z",
            "updatedAt": "2018-10-21T20:21:52.813Z"
        },
        "createdAt": "2018-10-21T18:46:33.825Z",
        "updatedAt": "2018-10-21T18:46:33.825Z"
    },
    {
        "description": "Festa muito topzera 2018 UFRPE",
        "price": 150,
        "tags": [
            "festa",
            "top",
            "ufrpe"
        ],
        "photos": [
            "Foto.jpg",
            "Capa.jpg"
        ],
        "active": true,
        "_id": "5bccc9b30b0a3715b4a07b38",
        "title": "Calourada Top 2018 UFRPE",
        "type": "Festa",
        "phone": "89452639",
        "owner": {
            "active": true,
            "_id": "5bca1207f9475400159db281",
            "user": "5bca1207f9475400159db280",
            "socialname": "Fagner INC.",
            "cnpj": "12345678901234",
            "authorization": "13a2sd465asd",
            "photo": "photo2.jpg",
            "createdAt": "2018-10-19T17:19:03.698Z",
            "updatedAt": "2018-10-21T20:21:52.813Z"
        },
        "createdAt": "2018-10-21T18:47:15.622Z",
        "updatedAt": "2018-10-21T18:47:15.622Z"
    }
]
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"tags\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"tags\"",
        "kind": "ObjectId",
        "value": "tags",
        "path": "_id"
    }
}
````
