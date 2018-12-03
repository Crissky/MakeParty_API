# Rotas - Avaliação de Anúncios (rating)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

<https://makepartyserver.herokuapp.com>

**Rotas que não são abertas necessitam receber o token de acesso. O Token pode ser passado no Body ou no Header(x-access-token).**

<br>

### Criar Avaliação de Anúncio

#### Método **POST: /ratings**

<br>

Chave   | Tipo                   | Requerimento
------- | ---------------------- | ------------
ad      | String (id do anúncio) | Obrigatório
rating  | Number (0-5)           | Obrigatório
comment | String                 | Obrigatório

<br>

**Corpo:**

```javascript
{
    "ad": "5bccc9890a6229312442519c",
    "rating": 4.5,
    "comment": "Muito organizado e chique"
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "rating": 4.5,
        "active": true,
        "_id": "5c04488d9e334c1c2c83e2a6",
        "ad": "5bccc9890a6229312442519c",
        "comment": "Muito organizado e chique",
        "customer": "5bca0f42f9475400159db27f",
        "createdAt": "2018-12-02T21:03:09.984Z",
        "updatedAt": "2018-12-02T21:03:09.984Z"
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

Chave   | Tipo                   | Requerimento
------- | ---------------------- | ------------
_id     | String                 | Obrigatório
ad      | String (id do anúncio) | Obrigatório
rating  | Number (0-5)           | Obrigatório
comment | String                 | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5c04488d9e334c1c2c83e2a6",
    "ad": "5bccc9890a6229312442519c",
    "rating": 1.5,
    "comment": "Muito organizado e chique. Só falta sal na comida."
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "rating": 1.5,
        "active": true,
        "_id": "5c04488d9e334c1c2c83e2a6",
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
                "updatedAt": "2018-12-02T19:29:39.914Z"
            },
            "createdAt": "2018-10-21T18:46:33.825Z",
            "updatedAt": "2018-10-21T18:46:33.825Z"
        },
        "comment": "Muito organizado e chique",
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
            "updatedAt": "2018-12-02T19:27:52.106Z"
        },
        "createdAt": "2018-12-02T21:03:09.984Z",
        "updatedAt": "2018-12-02T21:15:54.439Z"
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

Chave | Tipo                   | Requerimento
----- | ---------------------- | ------------
_id   | String                 | Obrigatório
ad    | String (id do anúncio) | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5c04488d9e334c1c2c83e2a6",
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
        "_id": "5c04488d9e334c1c2c83e2a6",
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
                "updatedAt": "2018-12-02T19:29:39.914Z"
            },
            "createdAt": "2018-10-21T18:46:33.825Z",
            "updatedAt": "2018-10-21T18:46:33.825Z"
        },
        "comment": "Muito organizado e chique",
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
            "updatedAt": "2018-12-02T19:27:52.106Z"
        },
        "createdAt": "2018-12-02T21:03:09.984Z",
        "updatedAt": "2018-12-02T21:16:41.409Z"
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
    "_id": "5c04488d9e334c1c2c83e2a6",
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
            "updatedAt": "2018-12-02T19:29:39.914Z"
        },
        "createdAt": "2018-10-21T18:46:33.825Z",
        "updatedAt": "2018-10-21T18:46:33.825Z"
    },
    "comment": "Muito organizado e chique",
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
        "updatedAt": "2018-12-02T19:27:52.106Z"
    },
    "createdAt": "2018-12-02T21:03:09.984Z",
    "updatedAt": "2018-12-02T21:16:41.409Z"
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
