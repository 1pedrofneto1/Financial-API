import fetch from "node-fetch";

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
    })
    .catch((err) => {
      return res.status(404).json(`Error:${err}`);
    });

  return next();
};

export default getAccounts;
