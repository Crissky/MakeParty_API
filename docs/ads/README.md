# Rotas - Anúncios (ads)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

<https://makepartyserver.herokuapp.com>

**Rotas que não são abertas necessitam receber o token de acesso. O TOKEN pode ser passado no Body ou no Header(x-access-token).**

<br>

### Criar Anúncio

#### Método **POST: /ads**

<br>

Chave                | Tipo       | Requerimento
-------------------- | ---------- | ------------
title                | String     | Obrigatório
description          | String     | Opcional
price                | Number     | Opcional
type                 | String     | Obrigatório
phone                | String     | Opcional
tags                 | StringList | Opcional
mainphoto            | String     | Opcional
photos               | StringList | Opcional
address.street       | String     | Opcional
address.number       | String     | Opcional
address.neighborhood | String     | Opcional
address.city         | String     | Opcional
address.zipcode      | String     | Opcional
address.state        | String     | Opcional

<br>

**Corpo:**

```javascript
{
    "title": "Calourada Top 2018 UFRPE",
    "description": "Festa muito topzera 2018 UFRPE",
    "price": 150,
    "type": "Festa",
    "phone":"89452639",
    "tags": ["Festa", "Top", "UFRPE"],
        "mainphoto":"Foto principal.png",
    "photos": ["Foto.jpg", "Capa.jpg"],
        "address":{
            "street":"Rua do Barro",
            "number":"302",
            "neighborhood":"Macaxeira",
            "city":"Hellcife",
            "zipcode":"53000-100",
            "state":"PE"
    }
}
```

<br>

**Resposta (SUCESSO):**

```javascript
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
        "mainphoto": "Foto principal.png",
        "address": {
            "street": "Rua do Barro",
            "number": "302",
            "neighborhood": "Macaxeira",
            "city": "Hellcife",
            "zipcode": "53000-100",
            "state": "PE"
        },
        "owner": {
                "active": true,
                "_id": "5bccd414cf399d231000849d",
                "user": {
                    "active": true,
                    "_id": "5bccd414cf399d231000849c",
                    "email": "teste@teste.com",
                    "createdAt": "2018-10-21T19:31:32.493Z",
                    "updatedAt": "2018-10-21T19:31:32.493Z"
                },
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
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Token Inválido"
}
```

<br>

### Atualizar Anúncio

#### Método **PUT: /ads**

<br>

Chave                | Tipo       | Requerimento
-------------------- | ---------- | ------------
_id                  | String     | Obrigatório
title                | String     | Obrigatório
description          | String     | Obrigatório
price                | Number     | Obrigatório
type                 | String     | Obrigatório
phone                | String     | Obrigatório
tags                 | StringList | Obrigatório
mainphoto            | String     | Opcional
photos               | StringList | Obrigatório
address.street       | String     | Obrigatório
address.number       | String     | Obrigatório
address.neighborhood | String     | Obrigatório
address.city         | String     | Obrigatório
address.zipcode      | String     | Obrigatório
address.state        | String     | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5bccead527f08c25fcedd3ba",
    "title": "Festa Best Topzera 2018 22",
    "description": "Festa muito top...",
    "price": 400,
    "type": "Festa",
    "phone":"89452639",
    "tags": ["FESTA", "Topzera", "BEST", "Bebidas"],
        "mainphoto":"Foto principal Nova.png",
    "photos": ["Foto.jpg", "Capa.jpg"],
        "address": {
            "street": "Rua do Jorge Luiz",
            "number": "3020",
            "neighborhood": "Dois Irmãos",
            "city": "Hellcife",
            "zipcode": "53000-101",
            "state": "PE"
        }
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "address": {
            "street": "Rua do Jorge Luiz",
            "number": "3020",
            "neighborhood": "Dois Irmãos",
            "city": "Hellcife",
            "zipcode": "53000-101",
            "state": "PE"
        },
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
                "user": {
                    "active": true,
                    "_id": "5bccd414cf399d231000849c",
                    "email": "teste@teste.com",
                    "createdAt": "2018-10-21T19:31:32.493Z",
                    "updatedAt": "2018-10-21T19:31:32.493Z"
                },
                "socialname": "Teste Testando",
                "cnpj": "98765432109876",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-21T19:31:32.625Z",
                "updatedAt": "2018-10-21T20:31:05.665Z"
        },
        "createdAt": "2018-10-21T21:08:37.235Z",
        "updatedAt": "2018-10-21T21:12:27.608Z",
        "mainphoto":"Foto principal Nova.png",
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Anuncio não encontrado ou não pertence a este Usuário."
}
```

<br>

### Apagar Anúncio

#### Método **DELETE: /ads**

<br>

Chave | Tipo   | Requerimento
----- | ------ | ------------
_id   | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5bccead527f08c25fcedd3ba"
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "address": {
            "street": "Rua do Jorge Luiz",
            "number": "3020",
            "neighborhood": "Dois Irmãos",
            "city": "Hellcife",
            "zipcode": "53000-101",
            "state": "PE"
        },
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
                "user": {
                    "active": true,
                    "_id": "5bccd414cf399d231000849c",
                    "email": "teste@teste.com",
                    "createdAt": "2018-10-21T19:31:32.493Z",
                    "updatedAt": "2018-10-21T19:31:32.493Z"
                },
                "socialname": "Teste Testando",
                "cnpj": "98765432109876",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-21T19:31:32.625Z",
                "updatedAt": "2018-10-21T20:31:05.665Z"
        },
        "createdAt": "2018-10-21T21:08:37.235Z",
        "updatedAt": "2018-10-21T21:15:24.635Z",
        "mainphoto": "Foto principal nova.png"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Anuncio não encontrado ou não pertence a este Usuário."
}
```

<br>

### Listar Anúncios - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### Método **GET: /ads**

<br>

**Resposta (SUCESSO):**

```javascript
{
    "ads": [
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:48:40.472Z",
            "updatedAt": "2018-10-21T18:55:09.348Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Token Inválido"
}
```

<br>

### Pesquisar Anúncio pelo ID - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### Método **GET: /ads/:id**

<br>

Parametro | Observação
--------- | -------------------------------------
ID        | O ID deve ser passado no fim da rota.

<br>

**Resposta (SUCESSO):**

```javascript
{
    "address": {
        "street": "Rua do Jorge Luiz",
        "number": "3020",
        "neighborhood": "Dois Irmãos",
        "city": "Hellcife",
        "zipcode": "53000-101",
        "state": "PE"
    },
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
```

<br>

**Resposta (ERROR):**

```javascript
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
```

<br>

### Listar Anúncios pela TAG - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### Método **GET: /tags/:tag**

<br>

Parametro | Observação
--------- | --------------------------------------
TAG       | A TAG deve ser passada no fim da rota.

<br>

**Resposta (SUCESSO):**

```javascript
{
    "ads": [
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:48:40.472Z",
            "updatedAt": "2018-10-21T18:55:09.348Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"tags\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"manhã\"",
        "kind": "ObjectId",
        "value": "manhã",
        "path": "_id"
    }
}
```

<br>

### Listar Anúncios pelo Tipo - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### Método **GET: /types/:type**

<br>

Parametro | Observação
--------- | ---------------------------------------
TYPE      | O TYPE deve ser passado no fim da rota.

<br>

**Resposta (SUCESSO):**

```javascript
{
    "ads": [
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:48:40.472Z",
            "updatedAt": "2018-10-21T18:55:09.348Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"type\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"festa\"",
        "kind": "ObjectId",
        "value": "festa",
        "path": "_id"
    }
}
```

<br>

### Listar Anúncios pelo Título - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### Método **GET: /titles/:title**

<br>

Parametro | Observação
--------- | ----------------------------------------
TITLE     | O TITLE deve ser passado no fim da rota.

<br>

**Resposta (SUCESSO):**

```javascript
{
    "ads": [
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:48:40.472Z",
            "updatedAt": "2018-10-21T18:55:09.348Z"
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
            "_id": "5bccead527f08c25fcedd3ba",
            "title": "Festa Best Topzera 2018 22",
            "type": "Festa",
            "phone": "89452639",
            "owner": {
                "active": true,
                "_id": "5bccd414cf399d231000849d",
                "user": {
                    "active": true,
                    "_id": "5bccd414cf399d231000849c",
                    "email": "teste@teste.com",
                    "createdAt": "2018-10-21T19:31:32.493Z",
                    "updatedAt": "2018-10-21T19:31:32.493Z"
                },
                "socialname": "Teste Testando",
                "cnpj": "98765432109876",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-21T19:31:32.625Z",
                "updatedAt": "2018-10-21T20:31:05.665Z"
            },
            "createdAt": "2018-10-21T21:08:37.235Z",
            "updatedAt": "2018-10-21T21:15:24.635Z"
        },
        {
            "address": {
                "street": "Rua do Jorge Luiz",
                "number": "3020",
                "neighborhood": "Dois Irmãos",
                "city": "Hellcife",
                "zipcode": "53000-101",
                "state": "PE"
            },
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
            "_id": "5bd3d1982a0e2a1404941e9d",
            "title": "Festa Best Topzera 2018 22",
            "type": "Festa",
            "phone": "89452639",
            "owner": {
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-27T02:46:48.792Z",
            "updatedAt": "2018-12-02T09:33:33.009Z",
            "mainphoto": "Foto principal nova.png"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"title\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"festa\"",
        "kind": "ObjectId",
        "value": "festa",
        "path": "_id"
    }
}
```

<br>

<br>

### Listar Anúncios pelo Preço - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### Método **GET: /prices/:price**

<br>

Parametro | Observação
--------- | --------------------------------------------------------------------------------------------------------------------------------------------------
PRICE     | O PRICE deve ser passado no fim da rota no formato 150-500\. (Este exemplo pesquisaria Anúncios a partir de 150 até 500) SOMENTE VALORES INTEIROS.

<br>

**Resposta (SUCESSO):**

```javascript
{
    "ads": [
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T19:29:39.914Z"
            },
            "createdAt": "2018-10-21T18:46:33.825Z",
            "updatedAt": "2018-10-21T18:46:33.825Z"
        },
        {
            "address": {
                "street": "Rua do Barro",
                "number": "302",
                "neighborhood": "Macaxeira",
                "city": "Hellcife",
                "zipcode": "53000-100",
                "state": "PE"
            },
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
            "_id": "5bd3d2592a0e2a1404941e9e",
            "title": "Calourada Top 2018 UFRPE",
            "type": "Festa",
            "phone": "89452639",
            "owner": {
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T19:29:39.914Z"
            },
            "createdAt": "2018-10-27T02:50:01.721Z",
            "updatedAt": "2018-10-27T02:50:01.721Z"
        },
        {
            "description": "Rave muito topzera 2018 UFRPE",
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
            "_id": "5bcf589da279c3001599878c",
            "title": "Calourada Rave 2018 UFRPE",
            "type": "Rave",
            "phone": "89452639",
            "owner": {
                "active": true,
                "_id": "5bcf1c7d05c1ce0015130769",
                "user": {
                    "active": true,
                    "_id": "5bcf1c7d05c1ce0015130768",
                    "email": "paulo@hotmail.com",
                    "createdAt": "2018-10-23T13:05:01.458Z",
                    "updatedAt": "2018-10-23T13:05:01.458Z"
                },
                "socialname": "Paulo INC.",
                "cnpj": "12345678901238",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-23T13:05:01.461Z",
                "updatedAt": "2018-10-23T13:07:45.914Z"
            },
            "createdAt": "2018-10-23T17:21:33.481Z",
            "updatedAt": "2018-10-23T17:21:33.481Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"price\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"a150\"",
        "kind": "ObjectId",
        "value": "a150",
        "path": "_id"
    }
}
```

<br>

### Listar Anúncios pelo ID do Anunciante - ROTA ABERTA (NÃO NECESSITA DE TOKEN)

#### É possível passar o ID do Anunciante como paramentro pela URL ou com o envio do TOKEN.

#### Método **GET: /owners/:owner**

<br>

Parametro | Observação
--------- | -----------------------------------------------------------
OWNER     | O OWNER (ID do Anúnciante) deve ser passado no fim da rota.

**OU**

Chave | Tipo   | Requerimento
----- | ------ | ------------
token | String | Obrigatório

<br>

**Resposta (SUCESSO):**

```javascript
{
    "ads": [
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:47:15.622Z",
            "updatedAt": "2018-10-21T18:47:15.622Z"
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
            "_id": "5bccc9890a6229312442519c",
            "title": "Calourada Top 2018 UFRPE",
            "type": "Festa",
            "phone": "89452639",
            "owner": {
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:46:33.825Z",
            "updatedAt": "2018-10-21T18:46:33.825Z"
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
                "plan": {
                    "name": "prata",
                    "totalad": 20,
                    "totalphoto": 100
                },
                "active": true,
                "_id": "5bca1207f9475400159db281",
                "user": {
                    "active": true,
                    "_id": "5bca1207f9475400159db280",
                    "email": "pg2006pe@hotmail.com",
                    "createdAt": "2018-10-19T17:19:03.690Z",
                    "updatedAt": "2018-10-19T17:19:03.690Z"
                },
                "socialname": "Fagner INC.",
                "cnpj": "24242424246006",
                "authorization": "13a2sd465asd",
                "photo": "photo2.jpg",
                "createdAt": "2018-10-19T17:19:03.698Z",
                "updatedAt": "2018-12-02T09:56:32.106Z"
            },
            "createdAt": "2018-10-21T18:48:40.472Z",
            "updatedAt": "2018-10-21T18:55:09.348Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": {
        "message": "Cast to ObjectId failed for value \"owner\" at path \"_id\" for model \"Ad\"",
        "name": "CastError",
        "stringValue": "\"5bca1207f9475400159db281\"",
        "kind": "ObjectId",
        "value": "5bca1207f9475400159db281",
        "path": "_id"
    }
}
```
