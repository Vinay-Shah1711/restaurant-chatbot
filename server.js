// server.js — Restaurant AI Chatbot Backend
// Free API used: Groq (https://console.groq.com) — Llama 3.3 model

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serves the chat widget

// ====== STEP 1: PUT YOUR RESTAURANT INFO HERE ======
// Edit this for YOUR restaurant. This becomes the chatbot's "brain".
const RESTAURANT_INFO = `
Reply in the same language the user writes in — Hindi, Gujarati, or English. If unsure, default to Hindi mixed with English (Hinglish).
You are the friendly AI assistant for "Spice Garden Restaurant" in Surat, Gujarat.
Answer ONLY using the information below. If asked something you don't know, say
"I'm not sure about that, please call us at +91-XXXXXXXXXX for details."
Keep replies short, warm, and helpful (2-4 sentences max).

RESTAURANT INFO:
- Name: Spice Garden Restaurant
- Location: Ring Road, Surat, Gujarat
- Timings: 11:00 AM - 11:00 PM, all days
- Cuisine: North Indian, Chinese, South Indian
- Popular dishes: Paneer Butter Masala (₹220), Veg Biryani (₹180), Masala Dosa (₹120), Chole Bhature (₹150)
- Delivery: Yes, via Zomato and Swiggy, free delivery above ₹300
- Table booking: Call +91-XXXXXXXXXX or walk-in
- Parking: Available
- Special: Full veg restaurant, no non-veg served
- Payment: Cash, UPI, Cards all accepted
`;

// ====== STEP 2: CHAT ENDPOINT ======
app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages = [
      { role: "system", content: RESTAURANT_INFO },
      ...history, // previous conversation for context
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // free, fast, high quality
        messages,
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API error:", data.error);
      return res.status(500).json({ error: "AI service error" });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
