import express from "express";
import dotenv from "dotenv";
import { verifyWebhook, receiveMessage } from "./webhook.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/webhook", verifyWebhook);
app.post("/webhook", receiveMessage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`WhatsApp bot running on port ${PORT}`);
});
