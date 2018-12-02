# Rotas - Avaliação de Anúncios (rating)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

<https://makepartyserver.herokuapp.com>

**Rotas que não são abertas necessitam receber o token de acesso. O Token pode ser passado no Body ou no Header(x-access-token).**

<br>

### Criar Avaliação de Anúncio

#### Método **POST: /ratings**

<br>

Chave  | Tipo         | Requerimento
------ | ------------ | ------------
ad     | String       | Obrigatório
rating | Number (0-5) | Obrigatório

<br>

**Corpo:**

```javascript
{
    "ad": "5bccc9b30b0a3715b4a07b38",
    "rating": 4.5
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "rating": 4.5,
        "active": true,
        "_id": "5bf333702efa900d34913344",
        "ad": "5bccc9b30b0a3715b4a07b38",
        "customer": "5bca0f42f9475400159db27f",
        "createdAt": "2018-11-19T22:04:32.690Z",
        "updatedAt": "2018-11-19T22:04:32.690Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "errmsg": "E11000 duplicate key error index: makepartydb.ratings.$customer_1_ad_1 dup key: { : ObjectId('5bca0f42f9475400159db27f'), : ObjectId('5bccc9b30b0a3715b4a07b38') }"
    }
}
```

<br>

### Atualizar Avaliação de Anúncio

#### Método **PUT: /ratings**

<br>

Chave  | Tipo         | Requerimento
------ | ------------ | ------------
_id    | String       | Obrigatório
ad     | String       | Obrigatório
rating | Number (0-5) | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5bf00e1734916523d4e3e01a",
    "ad": "5bccc9890a6229312442519c",
    "rating": 1.5
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "rating": 1.5,
        "active": true,
        "_id": "5bf00e1734916523d4e3e01a",
        "ad": {
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
        "customer": {
            "active": true,
            "_id": "5bca0f42f9475400159db27f",
            "user": {
                "active": true,
                "_id": "5bca0f42f9475400159db27e",
                "email": "fagner-silva@hotmail.com",
                "createdAt": "2018-10-19T17:07:14.841Z",
                "updatedAt": "2018-10-19T17:07:14.841Z"
            },
            "name": "Fagner da Silva Cristovam",
            "cpf": "06941674785",
            "birthdate": "1987-12-30T00:00:00.000Z",
            "phone": "34333163",
            "photo": "photo.jpg",
            "createdAt": "2018-10-19T17:07:14.888Z",
            "updatedAt": "2018-12-02T10:17:16.885Z"
        },
        "createdAt": "2018-11-17T12:48:23.763Z",
        "updatedAt": "2018-12-02T12:04:49.734Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Avaliação não encontrada."
}
```

<br>

### Apagar Avaliação de Anúncio

#### Método **DELETE: /ratings**

<br>

Chave | Tipo   | Requerimento
----- | ------ | ------------
_id   | String | Obrigatório
ad    | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5bf00e1734916523d4e3e01a",
    "ad": "5bccc9890a6229312442519c"
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "rating": 1.5,
        "active": false,
        "_id": "5bf00e1734916523d4e3e01a",
        "ad": {
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
        "customer": {
            "active": true,
            "_id": "5bca0f42f9475400159db27f",
            "user": {
                "active": true,
                "_id": "5bca0f42f9475400159db27e",
                "email": "fagner-silva@hotmail.com",
                "createdAt": "2018-10-19T17:07:14.841Z",
                "updatedAt": "2018-10-19T17:07:14.841Z"
            },
            "name": "Fagner da Silva Cristovam",
            "cpf": "06941674785",
            "birthdate": "1987-12-30T00:00:00.000Z",
            "phone": "34333163",
            "photo": "photo.jpg",
            "createdAt": "2018-10-19T17:07:14.888Z",
            "updatedAt": "2018-12-02T10:17:16.885Z"
        },
        "createdAt": "2018-11-17T12:48:23.763Z",
        "updatedAt": "2018-12-02T12:04:49.734Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Avaliação não encontrada ou não pertence a este Usuário."
}
```

<br>

### Buscar Avaliação de Anúncio pelo ID do Anúncio

#### Método **GET: /ratings/:ad**

<br>

Parametro | Observação
--------- | -----------------------------------------------------
AD        | O AD (id do anúncio) deve ser passada no fim da rota.

<br>

**Resposta (SUCESSO):**

```javascript
{
    "rating": 1.5,
    "active": true,
    "_id": "5bf00e1734916523d4e3e01a",
    "ad": {
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
    "customer": {
        "active": true,
        "_id": "5bca0f42f9475400159db27f",
        "user": {
            "active": true,
            "_id": "5bca0f42f9475400159db27e",
            "email": "fagner-silva@hotmail.com",
            "createdAt": "2018-10-19T17:07:14.841Z",
            "updatedAt": "2018-10-19T17:07:14.841Z"
        },
        "name": "Fagner da Silva Cristovam",
        "cpf": "06941674785",
        "birthdate": "1987-12-30T00:00:00.000Z",
        "phone": "34333163",
        "photo": "photo.jpg",
        "createdAt": "2018-10-19T17:07:14.888Z",
        "updatedAt": "2018-12-02T10:17:16.885Z"
    },
    "createdAt": "2018-11-17T12:48:23.763Z",
    "updatedAt": "2018-12-02T12:04:49.734Z"
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Avaliação não encontrada ou não pertence a este Usuário."
}
```

<br>
