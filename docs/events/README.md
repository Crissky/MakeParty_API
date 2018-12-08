# Rotas - Eventos (events)

## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

<https://makepartyserver.herokuapp.com>

**Rotas que não são abertas necessitam receber o token de acesso. O TOKEN pode ser passado no Body ou no Header(x-access-token).**

<br>

### Criar Evento

#### Método **POST: /events**

<br>

Chave                | Tipo   | Requerimento
-------------------- | ------ | ------------
advertiser           | String | Obrigatório
client               | String | Obrigatório
startdate            | String | Obrigatório
enddate              | String | Obrigatório
description          | String | Opcional
type                 | String | Obrigatório
address.street       | String | Opcional
address.number       | String | Opcional
address.neighborhood | String | Opcional
address.city         | String | Opcional
address.zipcode      | String | Opcional
address.state        | String | Opcional

<br>

**Corpo:**

```javascript
{
    "client":"Jupira da Silva",
    "startdate":"2018-12-04T17:00:00",
    "enddate":"2018-12-04T20:00:00",
    "description":"Festa de aniversário Sertanejo Universitário",
    "type":"Festa",
    "address":{
        "street":"Rua do Direita",
        "number":"1520",
        "neighborhood":"Dois Irmãos",
        "city":"Recife",
        "zipcode":"55247-100",
        "state":"PE"
    }
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "description": "Festa de aniversário Sertanejo Universitário",
        "active": true,
        "_id": "5c0b3d324582562348ae9893",
        "client": "Jupira da Silva",
        "startdate": "2018-12-04T20:00:00.000Z",
        "enddate": "2018-12-04T23:00:00.000Z",
        "type": "Festa",
        "address": {
            "street": "Rua do Direita",
            "number": "1520",
            "neighborhood": "Dois Irmãos",
            "city": "Recife",
            "zipcode": "55247-100",
            "state": "PE"
        },
        "advertiser": "5bca1207f9475400159db281",
        "createdAt": "2018-12-08T03:40:34.750Z",
        "updatedAt": "2018-12-08T03:40:34.750Z"
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

### Atualizar Evento

#### Método **PUT: /events**

<br>

Chave                | Tipo   | Requerimento
-------------------- | ------ | ------------
_id                  | String | Obrigatório
client               | String | Obrigatório
startdate            | String | Obrigatório
enddate              | String | Obrigatório
description          | String | Obrigatório
type                 | String | Obrigatório
address.street       | String | Obrigatório
address.number       | String | Obrigatório
address.neighborhood | String | Obrigatório
address.city         | String | Obrigatório
address.zipcode      | String | Obrigatório
address.state        | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5c0b3d324582562348ae9893",
    "client": "Jupira da Silva Barros",
    "startdate": "2018-12-04T20:00:00.000Z",
    "enddate": "2018-12-04T23:00:00.000Z",
    "description": "Festa de aniversário Sertanejo Universitário",
    "type": "Festa",
    "address": {
        "street": "Rua do Direita",
        "number": "1520",
        "neighborhood": "Dois Irmãos",
        "city": "Recife",
        "zipcode": "55247-100",
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
            "street": "Rua do Direita",
            "number": "1520",
            "neighborhood": "Dois Irmãos",
            "city": "Recife",
            "zipcode": "55247-100",
            "state": "PE"
        },
        "description": "Festa de aniversário Sertanejo Universitário",
        "active": true,
        "_id": "5c0b3d324582562348ae9893",
        "client": "Jupira da Silva Barros",
        "startdate": "2018-12-04T20:00:00.000Z",
        "enddate": "2018-12-04T23:00:00.000Z",
        "type": "Festa",
        "advertiser": {
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
        "createdAt": "2018-12-08T03:40:34.750Z",
        "updatedAt": "2018-12-08T03:56:36.118Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Evento não encontrado ou não pertence a este Usuário."
}
```

<br>

### Apagar Evento

#### Método **DELETE: /events**

<br>

Chave | Tipo   | Requerimento
----- | ------ | ------------
_id   | String | Obrigatório

<br>

**Corpo:**

```javascript
{
    "_id": "5c0b3d324582562348ae9893"
}
```

<br>

**Resposta (SUCESSO):**

```javascript
{
    "data": {
        "address": {
            "street": "Rua do Direita",
            "number": "1520",
            "neighborhood": "Dois Irmãos",
            "city": "Recife",
            "zipcode": "55247-100",
            "state": "PE"
        },
        "description": "Festa de aniversário Sertanejo Universitário",
        "active": false,
        "_id": "5c0b3d324582562348ae9893",
        "client": "Jupira da Silva Barros",
        "startdate": "2018-12-04T20:00:00.000Z",
        "enddate": "2018-12-04T23:00:00.000Z",
        "type": "Festa",
        "advertiser": {
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
        "createdAt": "2018-12-08T03:40:34.750Z",
        "updatedAt": "2018-12-08T04:01:40.512Z"
    }
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Evento não encontrado ou não pertence a este Usuário."
}
```

<br>

### Listar Eventos de um Anunciante

#### Método **GET: /events**

<br>

Query | Observação                                                             | Requerimento
----- | ---------------------------------------------------------------------- | ------------
limit | Número máximo de itens retornados                                      | Opcional
page  | Número da página. Número de itens ignorados com base no (limit * page) | Opcional

<br>

**Resposta (SUCESSO):**

```javascript
{
    "events": [
        {
            "address": {
                "street": "Rua do Direita",
                "number": "1520",
                "neighborhood": "Dois Irmãos",
                "city": "Recife",
                "zipcode": "55247-100",
                "state": "PE"
            },
            "description": "Festa de Aniversário em campo de futebol",
            "active": true,
            "_id": "5c0b436c68539726482cf692",
            "client": "Fernando Lima Cruz",
            "startdate": "2018-12-04T20:00:00.000Z",
            "enddate": "2018-12-04T23:00:00.000Z",
            "type": "Festa",
            "advertiser": {
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
            "createdAt": "2018-12-08T04:07:08.506Z",
            "updatedAt": "2018-12-08T04:07:08.506Z"
        },
        {
            "address": {
                "street": "Rua do Direita",
                "number": "1520",
                "neighborhood": "Dois Irmãos",
                "city": "Recife",
                "zipcode": "55247-100",
                "state": "PE"
            },
            "description": "Balada de Veterinária",
            "active": true,
            "_id": "5c0b42f568539726482cf691",
            "client": "Marina da Silva",
            "startdate": "2018-12-04T20:00:00.000Z",
            "enddate": "2018-12-04T23:00:00.000Z",
            "type": "Rave Agrícola",
            "advertiser": {
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
            "createdAt": "2018-12-08T04:05:09.261Z",
            "updatedAt": "2018-12-08T04:05:09.261Z"
        },
        {
            "address": {
                "street": "Rua do Direita",
                "number": "1520",
                "neighborhood": "Dois Irmãos",
                "city": "Recife",
                "zipcode": "55247-100",
                "state": "PE"
            },
            "description": "Festa de aniversário Sertanejo Universitário",
            "active": true,
            "_id": "5c0b3d324582562348ae9893",
            "client": "Jupira da Silva Barros",
            "startdate": "2018-12-04T20:00:00.000Z",
            "enddate": "2018-12-04T23:00:00.000Z",
            "type": "Festa",
            "advertiser": {
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
            "createdAt": "2018-12-08T03:40:34.750Z",
            "updatedAt": "2018-12-08T04:01:40.512Z"
        }
    ]
}
```

<br>

**Resposta (ERROR):**

```javascript
{
    "error": "Acesso Restrito"
}
```

<br>

### Listar Eventos de um Anunciante por Query

#### Método **GET: events/queries?**

#### É possível usar mais de um argumento na query usando **&** para separá-los. (/queries?&limit=5&page=3) _Pesquisa Eventos, _retornando 5 Eventos, mas ignorando os 15 primeiros resultados_

<br>

Query  | Observação                                                             | Requerimento
------ | ---------------------------------------------------------------------- | ------------
limit  | Número máximo de itens Retornados                                      | Opcional
page   | Número da página. Número de itens ignorados com base no (limit * page) | Opcional
client | Pesquisas Anúncios por cliente                                         | Opcional
type   | Pesquisas Anúncios por tipo                                            | Opcional

<br>

**Resposta (SUCESSO):**

```javascript
{
    "events": [
        {
            "address": {
                "street": "Rua do Direita",
                "number": "1520",
                "neighborhood": "Dois Irmãos",
                "city": "Recife",
                "zipcode": "55247-100",
                "state": "PE"
            },
            "description": "Balada de Veterinária",
            "active": true,
            "_id": "5c0b42f568539726482cf691",
            "client": "Marina da Silva",
            "startdate": "2018-12-04T20:00:00.000Z",
            "enddate": "2018-12-04T23:00:00.000Z",
            "type": "Rave Agrícola",
            "advertiser": {
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
            "createdAt": "2018-12-08T04:05:09.261Z",
            "updatedAt": "2018-12-08T04:05:09.261Z"
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
