# 🌟 Vizioni Rinor i Shalës (VRSH) - Platforma Digjitale

Ky është projekti zyrtar i faqes web për Organizatën Joqeveritare **"Vizioni Rinor i Shalës" (VRSH)**, me bazë në Shalë, Lipjan. Platforma është ndërtuar për të fuqizuar rininë lokale, për të promovuar aktivizmin qytetar dhe për të digjitalizuar proceset e organizatës.

🌐 **Faqja Zyrtare:** [https://vizionirinorishales.org](https://vizionirinorishales.org)

## 🚀 Veçoritë Kryesore

- **🌍 Sistemit Multi-Gjuhësh**: Mbështetje e plotë për gjuhën Shqipe dhe Angleze (AL/EN).
- **🤖 VIZIONI AI**: Një asistent inteligjent i integruar (bazuar në Gemini AI) që u përgjigjet pyetjeve të vizitorëve rreth organizatës, projekteve dhe vullnetarizmit.
- **📊 Paneli i Adminit**: Një sistem i plotë menaxhimi (Dashboard) për:
  - Menaxhimin e Projekteve (Shtim/Fshirje/Editim).
  - Publikimin e Lajmeve dhe Raporteve.
  - Menaxhimin e Stafit dhe Strukturës.
  - Rishikimin e Aplikimeve për Vullnetarë.
- **📝 Aplikimi Online**: Formular interaktiv për të rinjtë që dëshirojnë t'i bashkohen organizatës.
- **📱 Dizajn Responsiv**: Optimizuar për celularë, tabletë dhe desktop.
- **✨ Animacione Moderne**: Përdorimi i `framer-motion` për një përvojë sa më dinamike.

## 🛠️ Teknologjitë e Përdorura

- **Frontend**: React.js (me Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI Integration**: Google Generative AI (@google/genai)
- **Routing**: React Router DOM
- **State Management**: React Context API (për Gjuhën dhe Autentikimin)

## 📂 Struktura e Projektit

```text
├── src/
│   ├── components/     # Komponentët e ripërdorshëm (Navbar, Footer, etj.)
│   ├── context/        # LanguageContext për AL/EN
│   ├── pages/          # Faqet kryesore (Home, About, Projects, News, Admin, etj.)
│   ├── services/       # Shërbimet si MockDB dhe integrimi i AI
│   ├── types/          # Definicioni i TypeScript interfaces
│   └── App.tsx         # Konfigurimi i rrugëve (Routes)
├── public/             # Asetet statike
└── tailwind.config.js  # Konfigurimi i Tailwind
```

## ⚙️ Instalimi dhe Përdorimi

1. **Klononi repozitorin**:
   ```bash
   git clone https://github.com/erdonakadriolli/vizionirinorishales
   ```

2. **Instaloni varësitë**:
   ```bash
   npm install
   ```

3. **Konfiguroni variablat e mjedisit (.env)**:
   Krijoni një file `.env` dhe shtoni çelësin tuaj të Gemini API:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Nisni projektin**:
   ```bash
   npm run dev
   ```

## 🤖 VIZIONI AI

Asistenti ynë inteligjent është i trajnuar posaçërisht për VRSH. Ai:
- Nuk përdor markdown të rëndë (si `**`) për një lexim më të pastër.
- Identifikohet gjithmonë si "VIZIONI AI".
- Ofron informacione të sakta për stafin, drejtorin Leotrim Pajaziti dhe projektet si "Akademia Digjitale".

## ✍️ Autorësia

Ky projekt është dizajnuar dhe zhvilluar me përkushtim nga **Erdona Kadriolli**.

---
© 2026 Vizioni Rinor i Shalës. Të gjitha të drejtat të rezervuara.
