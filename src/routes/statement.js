import express from "express";

import getAccounts from "../middlewares/getAccounts.js";
import verifyAccountExistence from "../middlewares/verifyAccountExistence.js";

const router = express.Router();

router.get(
  "/statement/:id",
  getAccounts,
  verifyAccountExistence,
  (req, res) => {
    return res.status(200).json(req.account[0].statement);
  }
);

router.get(
  "/statement/:id/date",
  getAccounts,
  verifyAccountExistence,
  (req, res) => {
    const { date } = req.query;

    let statement = req.account[0].statement;

    statement = statement.filter((statement) => {
      return statement.created_at.slice(0, 10) === date.slice(0, 10);
    });

    return res.status(200).json({ statement });
  }
);

export default router;
