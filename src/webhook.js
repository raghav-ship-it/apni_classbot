import { sendTextMessage } from "./whatsapp.js";

/**
 * Webhook verification (Meta requirement)
 */
export function verifyWebhook(req, res) {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
        console.log("Webhook verified");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
}

/**
 * Receive incoming messages
 */
export async function receiveMessage(req, res) {
    try {
        const entry = req.body.entry?.[0];
        const change = entry?.changes?.[0];
        const message = change?.value?.messages?.[0];

        if (!message) {
            return res.sendStatus(200);
        }

        const from = message.from;
        const text = message.text?.body?.toLowerCase();

        console.log("Incoming:", from, text);

        // BASIC FLOW (you will expand this)
        if (text === "hi" || text === "hello") {
            await sendTextMessage(
                from,
                `Hi 👋 Welcome to ApniClass!

I can help you with:
1️⃣ Free sample paper
2️⃣ Course details
3️⃣ Fees

Reply with 1, 2 or 3`
            );
        }

        else if (text === "1") {
            await sendTextMessage(
                from,
                `📄 Free Sample Paper:
https://apniclass.in/sample-paper

Submit it and I’ll share feedback with you.`
            );
        }

        else if (text === "2") {
            await sendTextMessage(
                from,
                `📚 Our courses are designed for concept clarity + exam performance.

Reply:
1️⃣ Foundation
2️⃣ Advanced`
            );
        }

        else {
            await sendTextMessage(
                from,
                `Sorry, I didn’t understand that 😅  
Reply with *Hi* to see options again.`
            );
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Webhook error:", error.message);
        res.sendStatus(200);
    }
}
