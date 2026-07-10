# Restaurant AI Chatbot — Complete Setup Guide

Poora chatbot ready hai. Neeche diye steps follow karo, aaj hi live ho jayega.

---

## STEP 1: Free Groq API Key Lo (5 minutes)

1. Jao: https://console.groq.com
2. "Sign in" karo — Google account se login ho jayega (free, no credit card)
3. Left sidebar mein "API Keys" pe click karo
4. "Create API Key" — naam do (e.g. "restaurant-bot") — copy the key (starts with `gsk_...`)
5. **Isko safe rakho, kisi ko mat dena, GitHub pe public mat karna**

Free tier: 14,400 requests/day — ek chhote restaurant ke liye bahot zyada hai.

---

## STEP 2: Local Setup & Customize (10 minutes)

1. Is poore `restaurant-chatbot` folder ko apne computer pe le jao (VS Code mein kholo)
2. Terminal mein:
   ```
   npm install
   ```
3. `.env.example` file ko copy karke naam do `.env`:
   ```
   cp .env.example .env
   ```
4. `.env` file kholo aur apni Groq API key daalo:
   ```
   GROQ_API_KEY=gsk_yaha_apni_key_paste_karo
   ```
5. `server.js` file mein `RESTAURANT_INFO` section edit karo — apne (ya client ke) restaurant ka:
   - Naam, location, timings
   - Menu items with prices
   - Delivery info, booking number
   - Jo bhi FAQ log poochte hain

   Jitna detailed info doge, chatbot utna accurate jawab dega.

6. Server start karo:
   ```
   npm start
   ```
7. Browser mein kholo: `http://localhost:3000`
8. Chat icon (bottom-right) pe click karke test karo — "What's on the menu?", "Kab tak khula rehta hai?" jaisa poochke dekho

---

## STEP 3: Deploy Backend (Free — Render.com) — 10 minutes

Backend ko internet pe live karna hoga taaki client ki website se connect ho sake.

1. GitHub pe naya repo banao, ye poora code push karo:
   ```
   git init
   git add .
   git commit -m "restaurant chatbot"
   ```
   (GitHub pe naya repo bana ke usse connect karke push kar do — GitHub Desktop app use kar sakte ho agar terminal mushkil lage)

2. Jao: https://render.com — GitHub se sign in karo (free)
3. "New +" → "Web Service" → apna GitHub repo select karo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. "Environment" tab mein jaake add karo:
   - Key: `GROQ_API_KEY`, Value: apni key paste karo
6. "Create Web Service" — 2-3 minute mein deploy ho jayega
7. Tumhe ek URL milega jaisa: `https://restaurant-chatbot-xyz.onrender.com`

**Note:** Render free tier 15 min inactivity ke baad "sleep" ho jata hai, first request thoda slow (10-15 sec) hoga. Client ko batana ya paid tier (₹500/month se) upgrade karna — but demo/starting ke liye free tier bilkul theek hai.

---

## STEP 4: Deploy Frontend Widget (Free — Netlify) — 5 minutes

1. `public/index.html` mein `API_URL` line change karo:
   ```js
   const API_URL = "https://restaurant-chatbot-xyz.onrender.com/chat";
   ```
   (Step 3 wala URL yaha daalo, `/chat` add karke)

2. Jao: https://app.netlify.com → sign up free
3. "Add new site" → "Deploy manually" → `public` folder ko drag-drop kar do
4. Turant ek live URL milega jaisa `https://spice-garden-xyz.netlify.app`

Ye tumhara **demo link hai jo client ko dikha sakte ho**.

---

## STEP 5: Client Ki Real Website Mein Embed Karna

Client ki existing website mein bas ye chat widget ka HTML/CSS/JS part (button + chat window + script se) unke `index.html` mein paste kar do, aur `API_URL` unke backend URL pe point karo. Poora page replace karne ki zaroorat nahi — sirf widget part chahiye unhe.

---

## Troubleshooting

- **"AI service error"** → Groq API key galat hai ya .env file load nahi hui — server restart karo
- **Chat kaam nahi kar raha** → browser console (F12) mein error dekho, zyada tar `API_URL` galat hoga
- **Slow first response on Render** → normal hai free tier pe (cold start), 15 sec tak wait karo

---

## Next Steps (Business ke liye)

- Har naye client ke liye sirf `RESTAURANT_INFO` change karo — engine wahi reuse hoga
- Ek admin panel bana sakte ho baad mein jisse client khud apna menu update kar sake (advanced, abhi zaroori nahi)
- Pricing: ₹5,000-8,000 one-time setup + ₹500/month maintenance charge kar sakte ho (Render paid tier ka cost cover karne ke liye)
