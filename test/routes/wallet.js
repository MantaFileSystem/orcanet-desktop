const express = require("express");

const router = express.Router();

const receiverIds = ["13hgriwdajaPyWFABDX6QByyxvN8cWCgDp"];

const walletData = {
  wallet_id: "13hgriwdGXvPyWFABDX6QByyxvN8cWCgDp",
  balance: 1001.0,
  transactions: [
    {
      id: "59a53ee428a643e940546c5ccfc5663e",
      receiver: "13hgriwdajaPyWFABDX6QByyxvN8cWCgDp",
      amount: -12,
      status: "Pending",
      reason: "BananaHub.mp4",
      date: new Date("2024-04-10"),
    },
    {
      id: "f0623b42ea2d521b945a80b014f5694b",
      receiver: "13hgriwdajaPyWFABDX6QByyxvN8cWCgDp",
      amount: 12.13,
      status: "Failed",
      reason: "Dota2_OnePunchGodModeMenu.exe",
      date: new Date("2024-03-20"),
    },
    {
      id: "061b96f36e163ef82de2feefe7d7aaba",
      receiver: "13hgriwdajaPyWFABDX6QByyxvN8cWCgDp",
      amount: -8.311008,
      status: "Success",
      reason: "PayPaiBalanceInjector.bin",
      date: new Date("2024-02-01"),
    },
    {
      id: "b8ae1f8845ee9cbe64174ae089973b56",
      receiver: "13hgriwdajaPyWFABDX6QByyxvN8cWCgDp",
      amount: 66.3450023,
      status: "Success",
      reason: "",
      date: new Date("2024-01-15"),
    },
    {
      id: "bcaeff20734041e27098eb5138b3003a",
      receiver: "13hgriwdajaPyWFABDX6QByyxvN8cWCgDp",
      amount: -0.00432,
      status: "Success",
      reason: "きかんしゃトーマス.avi",
      date: new Date("2023-11-10"),
    },
    {
      id: "061b96f36e163ef82de2feefe7d7aaba",
      receiver: "13hgriwdajaPyWFABDX6QByyxvN8cWCgDp",
      amount: -83.11008,
      status: "Success",
      reason: "PayPaiBalanceInjector.bin",
      date: new Date("2023-12-01"),
    },
  ],
};

router.get("/balance", (req, res) => {
  res.send({
    wallet_id: walletData.wallet_id,
    balance: walletData.balance,
  });
});

/*
The following is the request for monthly revenue. 
Daily and monthly revenue requests should be pretty similar to the one below.
You main optimize it for better performance or time efficiency.
*/
router.get("/revenue/monthly", (req, res) => {
  const currDate = new Date(), revenue = [];
  
  for(let i = 0; i < 9; i++) {
    revenue.push({
      date: currDate.toLocaleString("default", { month: "short" }),
      earning: 0,
      spending: 0
    });
    currDate.setMonth(currDate.getMonth() - 1);
  }

  for (let r of revenue) {
    for (let t of walletData.transactions) {
      if (
        t.date.toLocaleString("default", { month: "short" }) === r.month &&
        t.status === "Success"
      ) {
        if (t.amount > 0) {
          r.earning += t.amount;
        } else {
          r.spending += -t.amount;
        }
      }
    }
  }

  res.send({
    wallet_id: walletData.wallet_id,
    revenue: revenue,
  });
});

router.get("/transactions/latest", (req, res) => {
  res.send({
    wallet_id: walletData.wallet_id,
    transactions: walletData.transactions.slice(0, 5),
  });
});

router.get("/transactions/complete", (req, res) => {
  res.send({
    wallet_id: walletData.wallet_id,
    transactions: walletData.transactions,
  });
});

router.post("/transfer", (req, res)=> {
  const transaction = {
    id: "061b96f36e163ef82de2feefe7d7aaba",
    receiver: req.body.receiver,
    amount: -req.body.amount,
    status: "Pending",
    reason: req.body.reason,
    date: new Date(),
  };

  walletData.transactions.unshift(transaction);
});


module.exports = router;
