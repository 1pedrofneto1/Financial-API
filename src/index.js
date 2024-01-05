import express from "express";

import accountsRoutes from "./routes/accounts.js";
import statementRoutes from "./routes/statement.js";
import transactionsRoutes from "./routes/transactions.js";

const app = express();

app.use(express.json());

app.use("/accounts", accountsRoutes);
app.use("/statements", statementRoutes);
app.use("/transactions", transactionsRoutes);

app.listen(3333);
