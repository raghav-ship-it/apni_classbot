import axios from "axios";

export async function sendTextMessage(to, body) {
    const url = `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`;

    const payload = {
        messaging_product: "whatsapp",
        to,
        text: { body }
    };

    const headers = {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    };

    await axios.post(url, payload, { headers });
}
