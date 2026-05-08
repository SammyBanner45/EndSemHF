# ISS Dashboard App

A production-ready React + Vite dashboard for live ISS tracking, space news, strict data-grounded chat, and deployment to Vercel.

## Features

- Live ISS position polling every 15 seconds.
- Last 15 ISS positions displayed with a Leaflet marker and trajectory polyline.
- Haversine-based ISS speed calculation with a line chart for the last 30 values.
- NewsAPI dashboard with 10 articles, search, sorting, images, descriptions, and 15-minute localStorage caching.
- Floating Hugging Face chatbot that only answers from loaded ISS and news data.
- Last 30 chat messages persisted in localStorage.
- News source distribution pie chart.
- Dark/light mode stored in localStorage.
- Loading states, error messages, and retry buttons.

## Project Structure

```text
.
├── .env.example
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   └── hero.png
│   ├── components
│   │   ├── Chatbot.jsx
│   │   ├── ErrorState.jsx
│   │   ├── IssMap.jsx
│   │   ├── IssSpeedChart.jsx
│   │   ├── IssTracker.jsx
│   │   ├── MetricCard.jsx
│   │   ├── NewsCard.jsx
│   │   ├── NewsDashboard.jsx
│   │   └── NewsDistributionChart.jsx
│   ├── hooks
│   │   ├── useChat.js
│   │   ├── useIssTracker.js
│   │   ├── useNews.js
│   │   └── useTheme.js
│   ├── index.css
│   ├── main.jsx
│   ├── services
│   │   ├── huggingFaceService.js
│   │   ├── issService.js
│   │   └── newsService.js
│   └── utils
│       ├── dates.js
│       ├── geo.js
│       └── storage.js
└── vite.config.js
```

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your keys:

```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_AI_TOKEN=your_huggingface_token
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## API Notes

- ISS data is requested from `http://api.open-notify.org/iss-now.json`. A client-side HTTPS fallback is included for production HTTPS hosts where browsers may block mixed-content HTTP requests.
- News data uses `VITE_NEWS_API_KEY` through `import.meta.env`.
- Hugging Face requests use `VITE_AI_TOKEN` through `import.meta.env`.
- This is a frontend-only app. Vite environment variables are exposed to the browser when prefixed with `VITE_`, so use keys intended for client-side use and restrict them in each provider dashboard where possible.

## GitHub Setup

Automated option with GitHub CLI:

```bash
git init
git add .
git commit -m "Initial commit - ISS Dashboard App"
gh repo create iss-dashboard --public --source=. --remote=origin --push
```

Manual option:

1. Create a public repository named `iss-dashboard` at [github.com/new](https://github.com/new).
2. Run:

```bash
git init
git add .
git commit -m "Initial commit - ISS Dashboard App"
git remote add origin https://github.com/YOUR_USERNAME/iss-dashboard.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

Install the Vercel CLI:

```bash
npm i -g vercel
```

Login:

```bash
vercel login
```

Deploy a preview:

```bash
vercel
```

Deploy to production:

```bash
vercel --prod
```

In the Vercel dashboard, add these environment variables before production use:

```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_AI_TOKEN=your_huggingface_token
```

The project is Vercel-compatible as a static Vite frontend: no server-side code, no absolute paths, Vite-prefixed env vars, and standard `dev`, `build`, and `preview` scripts.
