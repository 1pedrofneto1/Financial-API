import express from "express";

import accountsRoutes from "./routes/accounts.js";
import statementRoutes from "./routes/statement.js";
import transactionsRoutes from "./routes/transactions.js";

const app = express();

app.use(express.json());

app.use(accountsRoutes);
app.use(statementRoutes);
app.use(transactionsRoutes);

app.listen(3333);
