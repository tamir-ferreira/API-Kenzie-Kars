# Projeto Full Stack Motors Shop

Projeto Final de conclusão do curso Full Stack da Kenzie Academy Brasil desenvolvido em grupo.

Uma aplicação de compra e venda de veículos.

## Índice

- <a href="#-instalar">Instalando e rodando o projeto</a>
- <a href="#-funcionalidades">Funcionalidades</a>
- <a href="#-bibliotecas">Bibliotecas utilizadas</a>
- <a href="#-ferramentas">Ferramentas</a>
- <a href="#-endpoints">Endpoints</a>
- <a href="#-requisitos">Requisitos de serviço</a>
- <a href="#-contribuidoras">Pessoas contribuidoras</a>

## Instalando e rodando o projeto

```bash
# Instale as dependências:
$ npm install

# Execute a aplicação:
$ npm run dev

# Acesse pelo seu software de preferência (Postman, Insomnia):
$ http://localhost:3000
```

## Funcionalidades

### Gerais

- Cadastro e Login de usuários (Anunciante e Comprador);
- Editar perfil;
- Filtrar veículos por marca, modelo, etc;
- Visualizar e adicionar/excluir/editar comentários no anúncio;
- Botão para compra de veículo que redireciona para o contato do Anunciante;

### Anunciante

- Cadastrar/Editar/Excluir um anúncio;

## Bibliotecas utilizadas

- [x] express
- [x] typeorm
- [x] zod
- [x] pg
- [x] pg-format
- [x] jsonwebtoken
- [x] mailgen
- [x] nodemail
- [x] express-async-errors
- [x] dotenv
- [x] cors
- [x] bcryptjs

## Ferramentas

- [x] VS CODE
- [x] GitHub
- [x] GIT
- [x] TypeScript
- [x] Notion
- [x] JIRA

## Endpoints do serviço

| Método | Endpoint                    | Responsabilidade                         | Autenticação         |
| ------ | --------------------------- | ---------------------------------------- | -------------------- |
| POST   | /users                      | Cria um novo usuário                     | N/A                  |
| GET    | /users                      | Lista todos os usuários                  | N/A                  |
| PATCH  | /users/:id                  | Atualiza os dados de um usuário          | Dono do recurso      |
| DELETE | /users/:id                  | Deleta um usuário                        | Dono do recurso      |
| POST   | /users/resetPassword        | Envia um email para recuperação de senha | N/A                  |
| PATCH  | /links/resetPassword/:token | Atualiza a senha do usuário              | Dono do recurso      |
| POST   | /login                      | Login de usuário                         | N/A                  |
| POST   | /adverts                    | Cria um novo anúncio                     | Vendedor autenticado |
| GET    | /adverts                    | Lista todos os anúncios                  | N/A                  |
| GET    | /adverts/:id                | Lista um anúncio por Id                  | N/A                  |
| PATCH  | /adverts/:id                | Atualiza os dados de um anúncio          | Dono do recurso      |
| DELETE | /adverts/:id                | Deleta um anúncio                        | Dono do recurso      |
| POST   | /comments/:id               | Cria um comentário                       | Usuário autenticado  |
| GET    | /comments                   | Lista todos os comentários               | N/A                  |
| GET    | /comments/:id               | Lista um comentário por Id               | N/A                  |
| PATCH  | /comments/:id               | Atualiza os dados de um comentário       | Dono do recurso      |
| DELETE | /comments/:id               | Deleta um comentário                     | Dono do recurso      |

## Requisitos do Serviço

Esse serviço possui uma API REST para que os demais serviços consigam criar, listar, atualizar e deletar os links do banco de dados.

- O banco de dados utilizado foi **PostgreSQL**.

### **POST: /users**

**Exemplo de envio**:

```json
{
  "name": "Nome",
  "email": "mail@mail.com",
  "cpf": "11111111111",
  "password": "senha",
  "phone": "11111111111",
  "seller": true,
  "birthdate": "27/04/1999",
  "description": "Descrição",
  "address": {
    "city": "Cidade",
    "complement": "Complemento",
    "state": "DF",
    "street": "Rua",
    "zipCode": "11111111",
    "number": 111
  }
}
```

**Retorno**:

```json
{
  "id": 2,
  "name": "Nome",
  "email": "mail@mail.com",
  "phone": "11111111111",
  "cpf": "11111111111",
  "birthdate": "27/04/1999",
  "description": "Descrição",
  "admin": false,
  "seller": true,
  "color": "#fba22c",
  "reset_token": null,
  "createdAt": "2023-07-02",
  "updatedAt": "2023-07-02",
  "address": {
    "street": "Rua",
    "complement": "Complemento",
    "zipCode": "11111111",
    "number": 111,
    "city": "Cidade",
    "state": "DF",
    "id": 3
  }
}
```

### **POST: /login**

**Exemplo de envio**:

```json
{
  "email": "mail@mail.com"
}
```

**Retorno**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg4MzE5MzY5LCJleHAiOjE2ODg0MDU3NjksInN1YiI6IjIifQ.WF8foI9whorFAGNwrWRvRQ_Lt5mxxiIJGEqYzvewvt4"
}
```

### **POST: /users/resetPassword**

**Exemplo de envio**:

```json
{
  "email": "teste@mail.com"
}
```

**Retorno**:

```json
{
  "message": "token enviado"
}
```

### **PATCH: /users/resetPassword/:token**

**Exemplo de envio**:

```json
{
  "password": "NovaSenha"
}
```

**Retorno**:

```json
{
  "message": "senha alterada com sucesso"
}
```

### **PATCH: /users/:id**

**Exemplo de envio**:

```json
{
  "name": "Nome editado"
}
```

**Retorno**:

```json
{
  "id": 2,
  "name": "Nome editado",
  "email": "mail@mail.com",
  "phone": "11111111111",
  "cpf": "11111111111",
  "birthdate": "1999-04-27",
  "description": "Descrição",
  "admin": false,
  "seller": true,
  "color": "#fba22c",
  "reset_token": null,
  "createdAt": "2023-07-02",
  "updatedAt": "2023-07-02",
  "address": {
    "street": "Rua",
    "complement": "Complemento",
    "zipCode": "11111111",
    "number": 111,
    "city": "Cidade",
    "state": "DF",
    "id": 3
  }
}
```

### **PATCH: /addresses/:id**

**Exemplo de envio**:

```json
{
  "zipCode": "22222222",
  "state": "RJ"
}
```

**Retorno**:

```json
{
  "street": "Rua",
  "complement": "Complemento",
  "zipCode": "22222222",
  "number": 111,
  "city": "Cidade",
  "state": "RJ",
  "id": 3
}
```

### **POST: /adverts**

**Exemplo de envio**:

```json
{
  "brand": "fiat",
  "model": "argo drive 1.0 6v flex",
  "year": 2022,
  "fuel": "flex",
  "mileage": 25424,
  "color": "preto",
  "fipe_price": 77578,
  "price": 51614,
  "description": "Descrição do anúncio",
  "cover_image": "https://LinkParaAFotoCapa.jpg"
}
```

**Retorno**:

```json
{
  "id": 2,
  "brand": "Fiat",
  "model": "Argo drive 1.0 6v flex",
  "year": 2022,
  "fuel": "flex",
  "mileage": 25424,
  "color": "Preto",
  "fipe_price": "77578.00",
  "price": "51614.00",
  "description": "Descrição do anúncio",
  "cover_image": "https://LinkParaAFoto.jpg",
  "createdAt": "2023-07-02",
  "updatedAt": "2023-07-02",
  "is_active": true,
  "user": {
    "id": 2,
    "name": "Nome editado",
    "email": "mail@mail.com",
    "phone": "11111111111",
    "cpf": "11111111111",
    "birthdate": "1999-04-27",
    "description": "Descrição",
    "admin": false,
    "seller": true,
    "color": "#fba22c",
    "reset_token": null,
    "createdAt": "2023-07-02",
    "updatedAt": "2023-07-02"
  },
  "images": null
}
```

### **PATCH: /adverts/:id**

**Exemplo de envio**:

```json
{
  "color": "Vermelho",
  "description": "Descrição Editada",
  "images": {
    "image_link_one": "https://LinkParaAFotoGaleria.jpg"
  }
}
```

**Retorno**:

```json
{
  "id": 2,
  "brand": "Fiat",
  "model": "Argo drive 1.0 6v flex",
  "year": 2022,
  "fuel": "flex",
  "mileage": 25424,
  "color": "Vermelho",
  "fipe_price": "77578.00",
  "price": "51614.00",
  "description": "Descrição Editada",
  "cover_image": "https://LinkParaAFotoCapa.jpg",
  "createdAt": "2023-07-02",
  "updatedAt": "2023-07-02",
  "is_active": true,
  "images": {
    "image_link_one": "https://LinkParaAFotoGaleria.jpg",
    "image_link_two": null,
    "image_link_three": null,
    "image_link_four": null,
    "image_link_five": null,
    "image_link_six": null,
    "id": 2
  }
}
```

### **POST: /comments/:id**

**Exemplo de envio**:

```json
{
  "title": "Título do comentário",
  "content": "Corpo do comentário"
}
```

**Retorno**:

```json
{
  "id": 2,
  "title": "Título",
  "content": "Corpo",
  "createdAt": "2023-07-02T03:00:00.000Z",
  "userId": 2,
  "advertId": 2
}
```

### **PATCH: /comments/:id**

**Exemplo de envio**:

```json
{
  "content": "Corpo Editado"
}
```

**Retorno**:

```json
{
  "id": 2,
  "title": "Título",
  "content": "Corpo Editado",
  "createdAt": "2023-07-02",
  "user": {
    "id": 2,
    "name": "Nome editado",
    "email": "mail@mail.com"
  },
  "advert": {
    "id": 2
  }
}
```

## Pessoas contribuidoras

- [Antonio Augusto](https://github.com/AntonioAugustoRezende)
- [Lucca Haddad](https://github.com/LuccaHaddadSerejo)
- [Tamir S. Ferreira](https://github.com/tamir-ferreira)
- [Monica Lucana](https://github.com/lucana-m)
- [Miguel Napolitano](https://github.com/Miguelnapolitano)
