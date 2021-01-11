## Execução

1. Configure o arquivo `.env`, este arquivo contém a url que será usada para acessar a api.

2. Para executar a aplicação - uma vez que não realizei o deploy/buildprod - execute:
```
# Instale as dependências
npm install

# Execute o servidor em modo dev
npm run start
```

## Observações

* Configure o arquivo `.env` baseando-se no `.env.example`

* Caso esteja rodando a api com outra configuração, altere o arquivo `.env`

* Tomei a liberdade de fazer algumas modificações, como por exemplo, para validações, para cortar strings que iriam modificar o tamanho de cards, etc.

* O tamanho dos cards talvez saia um pouco do esperado (dev in 1366px srcn);