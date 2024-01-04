const verifyAccountExistence = (req, res, next) => {
  if (req.params.id) {
    req.account = req.accounts.filter(
      (account) => account.id === req.params.id
    );

    if (req.account.length === 0) {
      return res.status(404).json({ Error: "Account not found!!!" });
    }

    return next();
  }

  const { parameter } = req.params;

  req.account = req.accounts.filter(
    (account) =>
      account.name === parameter ||
      account.cpf === Number(parameter) ||
      account.id === parameter
  );

  if (req.account.length === 0) {
    return res.status(404).json({ Error: "Account not found!!!" });
  }

  return next();
};

export default verifyAccountExistence;
