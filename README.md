# 📰 THE DAILY — News App

> News, beyond the headline.

🔗 **Live Demo:** https://news-app-weld-seven.vercel.app/

📂 **GitHub Repository:** https://github.com/imsomya22092005-bot/News-app

---

## 📌 About The Project

THE DAILY is a modern and responsive news application built with React.js.

The application fetches live news articles from NewsAPI and allows users to explore news by category, search for specific topics, and open individual articles in a detailed view.

The project follows a modern editorial-style design with a dark newsroom interface, warm accent colors, animated elements, responsive layouts, and an image-focused news experience.

---

## ✨ Features

- 📰 Live news fetched from NewsAPI
- 🔎 Search news by keywords and topics
- 🗂️ Category-based news filtering
- 💻 Technology news
- 💼 Business news
- 🔬 Science news
- ⚽ Sports news
- 🎬 Entertainment news
- ⭐ Featured news section
- 🌍 Around the World section
- 📖 Detailed article view
- 🖼️ Article images
- 📝 Article title and summary
- 📅 Publication date
- 🏷️ News source information
- 🕒 Live date and time in the header
- 🍔 Responsive hamburger navigation
- 📱 Mobile, tablet and desktop responsive design
- ⚡ Loading state
- ❌ Error handling
- 🔗 Original source link
- 🔐 Private API key using environment variables
- ☁️ Vercel deployment

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3

### Libraries

- Axios
- React Router DOM

### API

- NewsAPI

### Development Tools

- Vite
- Node.js
- npm
- Visual Studio Code

### Version Control

- Git
- GitHub

### Deployment

- Vercel

---

## 📁 Project Structure

```text
news-app/
│
├── api/
│   └── news.js
│
├── public/
│   └── world-map.jpg
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── NewsList.jsx
│   │   ├── NewsItem.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── NewsDetails.jsx
│   │
│   ├── services/
│   │   └── newsApi.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env
├── package.json
├── package-lock.json
└── README.md
