<img src="./assets/img/logo-clubpetro.png"  style="display: block; margin:auto" alt="Clubpetro" width="300">

# CP challenge API

Versão: 0.1
Autor: Pedro Augusto C Santos, aka @ppcamp

---

## Configuração do banco

1. Com o docker instalado e executando, vá no diretório `docker`, crie um arquivo `.env` -- tome como exemplo o arquivo `.env.example` -- e execute o seguinte comando no terminal:

```bash
# Irá realizar o download de uma imagem modificada do postgres que contêm a extensão do uuidv4 na tabela de exemplo
docker-compose.exe up
```

2. Em seguida, utilizando o psql ou algum programa de sua escolha, crie um banco de dados no postgresql e rode o script que irá gerar as tabelas. Optei por usar o script sql, uma vez que o typeorm não permite otimizações específicas, como por exemplo, criação de indexes etc.

   > Sugiro o uso do [DBeaver](https://dbeaver.io/download/) para criação do banco e execução do script.
   > Segue abaixo um exemplo:

   ![Tuto 1](assets/img/Tuto_1.png 'Tutorial 1')

   ![Tuto 2](assets/img/Tuto_2.png 'Tutorial 2')

   ![Tuto 3](assets/img/Tuto_3.png 'Tutorial 3')

   ![Tuto 4](assets/img/Tuto_4.png 'Tutorial 4')

   ![Tuto 5](assets/img/Tuto_5.png 'Tutorial 5')

   ![Tuto 6](assets/img/Tuto_6.png 'Tutorial 6')

3. Por fim, configure a senha/nome do banco/usuário no arquivo `.env`.

## Executando a api

1. Configure o arquivo `.env` na raiz do projeto, tome como exemplo o arquivo `.env.example`;

2. Digite o seguinte comando:

```bash
# Instale as dependências
npm install
# Execute (Em dev)
npm run start:dev
# Execute (Em prod)
npm run start:prod
```

## Visualizando as rotas da API

Para visualizar as rotas da api (documentada usando o swagger) vá em: `localhost:3000/api` (valor default).
