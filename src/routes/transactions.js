import express from "express";
import fetch from "node-fetch";

import getAccounts from "../middlewares/getAccounts.js";
import verifyAccountExistence from "../middlewares/verifyAccountExistence.js";

const router = express.Router();

router.post(
  "/deposit/:id",
  getAccounts,
  verifyAccountExistence,
  async (req, res) => {
    const { value, type } = req.body;

    let statement = req.account[0].statement;

    statement.push({ value: value, created_at: new Date(), type: type });

    await fetch(`http://localhost:3000/accounts/${req.params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance: req.account[0].balance + value,
        statement: statement,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return res.status(201).json({ Message: "Deposit sent!!!", data });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ Error: "Failed to send deposit!!!" });
      });
  }
);

router.post(
  "/withdraw/:id",
  getAccounts,
  verifyAccountExistence,
  async (req, res) => {
    const { value, type } = req.body;

    if (value > req.account[0].balance) {
      return res
        .status(400)
        .json({ Error: "Withdrawal greater than the available amount!!!" });
    }

    let statement = req.account[0].statement;

    statement.push({ value: value, created_at: new Date(), type: type });

    await fetch(`http://localhost:3000/accounts/${req.params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance: req.account[0].balance - value,
        statement: statement,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return res.status(201).json({ Message: "Withdrawal made!!!", data });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ Error: "Failed to withdraw!!!" });
      });
  }
);

export default router;
