### 🚀 Documentação da Financial-API

Esta API foi construída usando Express.js e permite a manipulação de contas bancárias. 🏦

### 📦 Dependências

Aqui estão as dependências utilizadas neste projeto:

1. express: Um framework web para Node.js que simplifica a criação de servidores web.
2. json-server: Uma ferramenta para criar um servidor REST JSON falso para prototipagem e teste.
3. node-fetch: Uma implementação leve do fetch API para Node.js.
4. uuid: Uma biblioteca para gerar identificadores únicos universais (UUIDs).

### 📜 Scripts

Os seguintes scripts estão disponíveis para este projeto:

dev: Inicia o servidor usando o nodemon, que reinicia automaticamente o servidor sempre que os arquivos são alterados.
db: Inicia o json-server que serve o arquivo db.json.

### Rotas

### Rotas de Contas (accountsRoutes)

📚 GET /accounts
Retorna todas as contas. Não requer parâmetros.

🔍 GET /accounts/filter/:parameter
Retorna uma conta específica com base no parâmetro fornecido. O parâmetro pode ser o nome, cpf ou id da conta.

➕ POST /accounts
Cria uma nova conta. O nome e o cpf devem ser fornecidos no corpo da solicitação.

✏️ PATCH /accounts/:id
Atualiza o nome de uma conta específica. O novo nome deve ser fornecido no corpo da solicitação.

❌ DELETE /accounts/:id
Exclui uma conta específica. O id da conta é passado como parâmetro na URL.

### Rotas de Extratos (statementsRoutes)

📃 GET /statement/:id
Retorna o extrato de uma conta específica. O id da conta é passado como parâmetro na URL.

📅 GET /statement/:id/date
Retorna o extrato de uma conta específica em uma data específica. A data é fornecida como um parâmetro de consulta.

### Rotas de Transações (transactionsRoutes)

💰 POST /deposit/:id
Realiza um depósito em uma conta específica. O valor e o tipo de transação devem ser fornecidos no corpo da solicitação.

💸 POST /withdraw/:id
Realiza um saque de uma conta específica. O valor e o tipo de transação devem ser fornecidos no corpo da solicitação.

🧩 Middlewares
📚 getAccounts
Recupera todas as contas do servidor.

🔍 verifyAccountExistence
Verifica se uma conta específica existe.