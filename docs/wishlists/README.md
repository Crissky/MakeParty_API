# Rotas - Lista de Desejos (wishlists)
## AVISO: API em desenvolvimento, as ROTAS, REQUISIÇÕES e RETORNOS podem sofrer alterações.

https://makepartyserver.herokuapp.com

**Rotas que não são abertas necessitam receber o token de acesso. O Token pode ser passado no Body ou no Header(x-access-token).**

<br>

### Adicionar Anúncio a Lista de Desejos
#### Método **POST: /wishlists**

<br>

Chave | Tipo | Requerimento
------|------|-------------
ad | String | Obrigatório

<br>

**Corpo:**
````javascript
{
	"ad":"5bd3d2592a0e2a1404941e9e",
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmNhMGY0MmY5NDc1NDAwMTU5ZGIyN2YiLCJ1c2VyIjp7Il9pZCI6IjViY2EwZjQyZjk0NzU0MDAxNTlkYjI3ZSIsImVtYWlsIjoiZmFnbmVyLXNpbHZhQGhvdG1haWwuY29tIn0sImlhdCI6MTU0MTg5MzQzNywiZXhwIjoxNTQxOTc5ODM3fQ.4kzWlNHOxMZO-t2TokN6_vgoYJ6DNkOoxpk7zSZqcc0"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "active": true,
        "_id": "5be77e07c5e9b332c021ee30",
        "ad": "5bd3d2592a0e2a1404941e9e",
        "owner": "5bca0f42f9475400159db27f",
        "createdAt": "2018-11-11T00:55:35.886Z",
        "updatedAt": "2018-11-11T00:55:35.886Z"
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

### Apagar Anúncio da Lista de Desejos
#### Método **DELETE: /wishlists**

<br>

Chave | Tipo | Requerimento
------|------|-------------
ad | String | Obrigatório

<br>

**Corpo:**
````javascript
{
	"ad":"5bd3d2592a0e2a1404941e9e",
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmNhMGY0MmY5NDc1NDAwMTU5ZGIyN2YiLCJ1c2VyIjp7Il9pZCI6IjViY2EwZjQyZjk0NzU0MDAxNTlkYjI3ZSIsImVtYWlsIjoiZmFnbmVyLXNpbHZhQGhvdG1haWwuY29tIn0sImlhdCI6MTU0MTg5MzQzNywiZXhwIjoxNTQxOTc5ODM3fQ.4kzWlNHOxMZO-t2TokN6_vgoYJ6DNkOoxpk7zSZqcc0"
}
````

<br>

**Resposta (SUCESSO):**
````javascript
{
    "data": {
        "active": true,
        "_id": "5be77e07c5e9b332c021ee30",
        "ad": {
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
            "owner": "5bca1207f9475400159db281",
            "createdAt": "2018-10-27T02:50:01.721Z",
            "updatedAt": "2018-10-27T02:50:01.721Z"
        },
        "owner": "5bca0f42f9475400159db27f",
        "createdAt": "2018-11-11T00:55:35.886Z",
        "updatedAt": "2018-11-11T00:55:35.886Z",
        "__v": 0
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

### Listar Anúncios da Lista de Desejos
#### Método **GET: /wishlists**

<br>

**Resposta (SUCESSO):**
````javascript
{
    "list": [
        {
            "active": true,
            "_id": "5be7738930509d0e3812b6da",
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
                "owner": "5bca1207f9475400159db281",
                "createdAt": "2018-10-21T18:46:33.825Z",
                "updatedAt": "2018-10-21T18:46:33.825Z"
            },
            "owner": "5bca0f42f9475400159db27f",
            "createdAt": "2018-11-11T00:10:49.124Z",
            "updatedAt": "2018-11-11T00:10:49.124Z"
        },
        {
            "active": true,
            "_id": "5be7858e2269c70016f612c1",
            "ad": {
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
                "owner": "5bca1207f9475400159db281",
                "createdAt": "2018-10-27T02:50:01.721Z",
                "updatedAt": "2018-10-27T02:50:01.721Z"
            },
            "owner": "5bca0f42f9475400159db27f",
            "createdAt": "2018-11-11T01:27:42.048Z",
            "updatedAt": "2018-11-11T01:27:42.048Z"
        }
    ]
}
````

<br>

**Resposta (ERROR):**
````javascript
{
    "error": "Token Inválido"
}
````
