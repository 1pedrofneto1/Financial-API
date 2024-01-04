import express from "express";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

const getAccount = async () => {
  let accounts;
  await fetch("http://localhost:3000/accounts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      accounts = data;
    })
    .catch((err) => console.log(`Error:${err}`));

  return accounts;
};

const getStatement = async (id) => {
  let statement;
  await fetch(`http://localhost:3333/account/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      statement = data[0].statement;
    })
    .catch((err) => console.log(`Error:${err}`));

  return statement;
};

app.get("/accounts", async (req, res) => {
  const accounts = await getAccount();

  return res.status(200).send(accounts);
});

app.get("/account/:id", async (req, res) => {
  const { id } = req.params;

  const accounts = await getAccount();

  const account = accounts.filter((account) => account.id === id);

  if (account.length === 0) {
    return res.status(404).send({ Error: "Account not found" });
  }

  return res.status(200).send(account);
});

app.get("/account/filter/:parameter", async (req, res) => {
  const { parameter } = req.params;

  const accounts = await getAccount();

  const account = accounts.filter(
    (account) => account.name === parameter || account.cpf === Number(parameter)
  );

  if (account.length > 0) {
    return res.status(200).send(account);
  }

  return res.status(404).send({ Error: "Account not found!!!" });
});

app.get("/statement/:id", async (req, res) => {
  const { id } = req.params;

  const accountStatement = await getStatement(id);

  if (!accountStatement) {
    return res.status(404).send({ Error: "Account not found" });
  }

  return res.status(200).send(accountStatement);
});

app.post("/accounts", async (req, res) => {
  const { name, cpf } = req.body;

  const accounts = await getAccount();

  if (accounts.some((account) => account.cpf === cpf)) {
    return res.status(400).send({ Error: "Cpf already registered!!!" });
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

  return res.status(201).send({ Sucess: "Account created!!!" });
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
      res.status(200).send({ message: "Account deleted!!!" });
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      res.status(404).send({ Error: "Account not found!!!" });
    });
});

app.listen(3333);
