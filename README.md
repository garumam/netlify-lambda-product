# Desafio e-commerce serverless

Projeto realizado por mim para uma entrevista de emprego. [link para o site hospedado no netlify](https://modest-banach-4de146.netlify.app/).


## Pré-requisitos

* NodeJS - (versão utilizada por mim v12.18.3)
* npm ou yarn para gerenciar os pacotes
* Navegador (Chrome, FireFox, Edge, etc...)
* Terminal a sua escolha
* Url de acesso para um banco noSQL mongoDB
* Url de acesso para um banco SQL postgreSQL

## Executar

1. Clonar repositório em algum diretório.
2. Entrar na pasta do projeto pelo terminal.
3. Rodar **npm install** ou **yarn** para instalar as dependências.
4. Criar um arquivo .env na raiz do projeto.
>Basta copiar o arquivo **.env.exemplo** e preencher as informações de **DB_URL_PRODUCT** e **DB_URL_SALE** com a url dos respectivos banco de dados de vocês, deixe o **BASE_URL** do jeito que está localhost na porta 9000 pois o netlify-lambda rodará nesta porta.
5. Rode um **npx sequelize db:migrate** ou **yarn sequelize db:migrate** para rodar as migrations no banco postgreSQL.
> Não esquecer de criar a tabela no banco antes de rodar as migrations.
6. Agora execute o comando **npm run start:server** ou **yarn start:server** para rodar as lambda functions, deverá aparecer no terminal a seguinte mensagem **Lambda server is listening on 9000**.
7. Concluindo o passo acima basta executar o comando **npm run start:web** ou **yarn start:web** para rodar a SPA feita em react com webpack e babel.
8. Se tudo der certo o site se abrirá sozinho na porta **3000**, não haverá nada listado no site pois sua base de dados ainda precisa de dados kkkk.
9. Para facilitar enviei junto ao repositório um arquivo **json** exportado do **insomnia** na pasta **insomnia_json_routes** com todas as rotas da aplicação configuradas.
10. Importe o arquivo no seu insomnia e procure a rota **POST** com o nome de **sales-product-store**, clique nela e preencha as informações necessárias e crie quantos produtos quiser para testar.
11. Caso você queira utilizar outro método para fazer a request sem ser o insomnia basta mandar um request **POST** para a rota http://localhost:9000/sales-product-store passando os seguintes parâmetros em formato **JSON**.
> {
    "name": "Qualquer coisa",
    "qtd": 150,
    "price": 10.90,
    "picture": "https://picsum.photos/300/300",
    "detail": "texto qualquer"
}

## Tecnologias utilizadas no projeto
* NodeJS - ambiente para executar o projeto
* ReactJS - framework javascript para criação de componentes
* Typescript e Javascript - linguagens utilizadas no projeto
* Webpack + Babel - executar e buildar o projeto em react
* Netlify-lambda - executar e buildar as lambda functions
* Styled-components - estilização de componentes
* Mongoose - para controlar o mongoDB
* Sequelize - para controlar o postgreSQL
* Axios - HTTP requests
* Yup - validações

## Todas as rotas disponíveis nas lambdas

**GET** - http://localhost:9000/products-all
> Retorna um JSON com todos os produtos.

**GET** - http://localhost:9000/products-show?id=5f507ae010925117e02d6606
> Retorna um JSON com o produto com o **id** passado por parâmetro.

**PUT** - http://localhost:9000/products-store
> Parâmetros para enviar no request. (Se enviar o code de um produto existente ele atualiza o mesmo, se tirar o code ele cria um novo produto)
> {
		"code": "OPCIONAL",
    "name": "Produto novo 2",
    "qtd": 10,
    "price": 2,
    "picture": "https://picsum.photos/200",
    "detail": "Curabitur ullamcorper urna massa, ac aliquam massa euismod sit amet."
}
> Retorna um JSON com código do produto que foi criado ou atualizado. (Esta rota cria o produto apenas no **mongoDB**, ela é apenas um complemento para a rota /sales-product-store)

**POST** - http://localhost:9000/products-by-ids
> Parâmetros para enviar no request. (Array com ids de produtos que você quiser buscar)
> {
		"productIds": ["5f507ae010925117e02d6606"]
}
> Retorna um JSON com todos os produtos

**GET** - http://localhost:9000/sales-all
> Retorna um JSON com todas as vendas realizadas

**GET** - http://localhost:9000/sales-show?id=1652ee61-2524-4aad-803a-83bc2b1b5ed9
>  Retorna um JSON com a venda referente ao **id** passado por parâmetro, todos os produtos associados a ela e o status de pagamento.

**POST** - http://localhost:9000/sales-store
> Parâmetros para enviar no request. (Array de objetos com name, code e qtd de cada produto que você quer comprar)
> {
	"products": [
		{"name": "Produto 1","code": "5f4c08803cc", "qtd": 1},
		{"name": "Produto 2","code": "87348ae0ga", "qtd": 1}
	]
}
> Retorna um JSON com uma mensagem de sucesso

**POST** - http://localhost:9000/sales-product-store
> Parâmetros para enviar no request. (Esta rota cria o produto de forma completa no sistema, ela chama a rota /products-store para salvar no mongoDB)
> {
    "name": "Produto novo 2",
    "qtd": 10,
    "price": 2,
    "picture": "https://picsum.photos/200",
    "detail": "Curabitur ullamcorper urna massa, ac aliquam massa euismod sit amet."
}
> Retorna um JSON com uma mensagem de sucesso

**GET** - http://localhost:9000/payment-store
> Retorna um JSON com um dos valores de forma random ('pending' | 'approved' | 'disapproved')
> {
  "status": "pending"
}
> Esta rota foi criada apenas para simular status diferentes na hora de realizar venda.
