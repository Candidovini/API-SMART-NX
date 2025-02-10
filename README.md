# API Smart NX

Este repositório contém a API do sistema Smart NX. A API foi desenvolvida utilizando Node.js e Sequelize para a interação com o banco de dados. Abaixo você encontra as instruções para rodar o projeto, instalar dependências, rodar em desenvolvimento e produção, e outras informações úteis.

## Instruções de Inicialização

### 1. Instalação das Dependências

Para instalar as dependências necessárias, utilize o comando abaixo:

npm install

### 2. Variáveis de Ambiente

Renomeie o arquivo `.env-example` para `.env` e configure as variáveis de ambiente para o seu ambiente de desenvolvimento e produção. Exemplo de variáveis:

API_PORT=3001
SECRET_KEY=SMART_NX
POSTGRES_USER=dev
POSTGRES_PASSWORD=123456
POSTGRES_DB=social_media
DB_PORT=5432

### 3. Comandos NPM

A seguir estão os comandos que você pode usar para rodar e configurar o projeto:

- **Iniciar a API** (modo de desenvolvimento):

npm run dev

- **Iniciar a API** (modo de produção):

npm start

- **Resetar o banco de dados** (remove, cria e migra o banco de dados):

npm run db:reset

- **Rodar o Linter** (para verificar e corrigir erros de estilo):

npm run lint

- **Rodar o Linter com correções automáticas**:

npm run eslint:fix

- **Gerar a documentação Swagger**:

npm run swagger

### 4. Docker Compose

Caso você deseje rodar o projeto utilizando Docker, siga os seguintes passos:

1. Crie ou atualize o arquivo `.env` conforme mencionado anteriormente.
2. Utilize o comando abaixo para inicializar os containers Docker:

docker-compose up --build

3.Para rodar o ambiente em segundo plano, adicione `-d`:
docker-compose up --build -d

4.Para parar os containers:
docker-compose down

### 5. Documentação Swagger

A API tem a documentação Swagger configurada para que você possa testar os endpoints diretamente no navegador. Após rodar a API, acesse:

http://localhost:3001/swagger

Além disso há uma collection do POSTMAN para facilitar o teste dos endpoints.

### 6. Roteamento e Endpoints

A API oferece diversos endpoints para gerenciar usuários, posts, comentários e mais. Confira a documentação Swagger para detalhes sobre cada endpoint.

---
