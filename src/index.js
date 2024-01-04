import express from "express";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

const getAccounts = async (req, res, next) => {
  await fetch("http://localhost:3000/accounts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      req.accounts = data;
      console.log(req.accounts);
    })
    .catch((err) => res.status(404).json(`Error:${err}`));

  next();
};

const getStatement = async (req, res, next) => {
  const { id } = req.params;
  await fetch(`http://localhost:3333/account/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      req.statement = data[0].statement;
    })
    .catch((err) => res.status(404).json(`Error:${err}`));

  next();
};

app.get("/accounts", getAccounts, async (req, res) => {
  return res.status(200).json(req.accounts);
});

app.get("/account/:id", getAccounts, async (req, res) => {
  const { id } = req.params;

  const account = req.accounts.filter((account) => account.id === id);

  if (account.length === 0) {
    return res.status(404).json({ Error: "Account not found" });
  }

  return res.status(200).json(account);
});

app.get("/account/filter/:parameter", getAccounts, async (req, res) => {
  const { parameter } = req.params;

  const account = req.accounts.filter(
    (account) => account.name === parameter || account.cpf === Number(parameter)
  );

  if (account.length > 0) {
    return res.status(200).json(account);
  }

  return res.status(404).json({ Error: "Account not found!!!" });
});

app.get("/statement/:id", getStatement, async (req, res) => {
  if (!req.statement) {
    return res.status(404).json({ Error: "Account not found" });
  }

  return res.status(200).json(req.statement);
});

app.post("/accounts", getAccounts, async (req, res) => {
  const { name, cpf } = req.body;

  if (req.accounts.some((account) => account.cpf === cpf)) {
    return res.status(400).json({ Error: "Cpf already registered!!!" });
  }

  fetch("http://localhost:3000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      cpf: cpf,
      id: uuidv4(),
      statement: [],
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(`Error:${err}`));

  return res.status(201).json({ Sucess: "Account created!!!" });
});

app.delete("/account/:id", async (req, res) => {
  const { id } = req.params;

  await fetch(`http://localhost:3000/accounts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Account not found");
      }
      return res.json();
    })
    .then((data) => {
      res.status(200).json({ message: "Account deleted!!!" });
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res.status(404).json({ Error: "Account not found!!!" });
    });
});

app.listen(3333);
