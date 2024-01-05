import express from "express";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

import getAccounts from "../middlewares/getAccounts.js";
import verifyAccountExistence from "../middlewares/verifyAccountExistence.js";

const router = express.Router();

router.get("/", getAccounts, (req, res) => {
  return res.status(200).json(req.accounts);
});

router.get(
  "/filter/:parameter",
  getAccounts,
  verifyAccountExistence,
  (req, res) => {
    return res.status(200).json(req.account);
  }
);

router.post("/", getAccounts, async (req, res) => {
  const { name, cpf } = req.body;

  if (req.accounts.some((account) => account.cpf === cpf)) {
    return res.status(400).json({ Error: "Cpf already registered!!!" });
  }

  await fetch("http://localhost:3000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      cpf: cpf,
      id: uuidv4(),
      balance: 0,
      statement: [],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return res.status(201).json({ Sucess: "Account created!!!", data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ Error: "Failed to create account!!!" });
    });
});

router.patch("/:id", getAccounts, verifyAccountExistence, async (req, res) => {
  const { name } = req.body;

  await fetch(`http://localhost:3000/accounts/${req.params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return res
        .status(200)
        .json({ Message: "Name updated successfully!!!", data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ Error: "Failed to update name" });
    });
});

router.delete("/:id", getAccounts, verifyAccountExistence, async (req, res) => {
  await fetch(`http://localhost:3000/accounts/${req.params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      return res.status(200).json({ message: "Account deleted!!!" });
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      return res.status(400).json({ Error: "Error deleting account!!!" });
    });
});

export default router;
