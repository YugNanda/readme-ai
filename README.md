# 🪄 Readme.AI

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Gemini AI](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://readme-ai-azure.vercel.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FluxHarsh/Readme.AI-/pulls)

> Transform any GitHub repository into a beautifully structured, production-ready README — instantly.

**Readme.AI** is a full-stack AI-powered web app that analyzes your GitHub repository and generates a professional `README.md` in seconds using Google's Gemini AI. Skip the boilerplate and let AI craft your perfect documentation.

🌐 **Live Demo:** [readme-ai-azure.vercel.app](https://readme-ai-azure.vercel.app)

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

- **Instant README Generation** — Paste a GitHub URL and get a full README in seconds
- **AI-Powered** — Uses Google Gemini to analyze repo structure and generate smart content
- **Live Preview** — See the rendered markdown in real-time before downloading
- **Copy & Download** — One-click copy or download as `README.md`
- **Beautiful UI** — Clean, dark-themed interface with smooth animations
- **Fully Responsive** — Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool + dev server |
| Tailwind CSS | Styling |
| react-markdown | Markdown rendering |
| lucide-react | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | API server |
| TypeScript | Type safety |
| @google/genai | Gemini AI SDK |
| dotenv | Environment variables |
| cors | Cross-origin requests |

### Hosting
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| GitHub | Source control |

---

## 🔄 How It Works
```
User pastes GitHub URL
        ↓
Frontend validates URL format
        ↓
POST /api/generate → Express backend
        ↓
Extract owner + repo from URL
        ↓
Fetch repo data from GitHub API
        ↓
Send repo data to Gemini AI with prompt
        ↓
Gemini generates professional markdown
        ↓
Frontend renders live preview
        ↓
User copies or downloads README.md
```

---

## 📁 Project Structure
```
Readme.AI/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── readmeController.ts
│   │   ├── routes/
│   │   │   └── readmeRoutes.ts
│   │   ├── services/
│   │   │   ├── githubService.ts
│   │   │   └── geminiService.ts
│   │   ├── utils/
│   │   │   └── extractRepo.ts
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── vite.config.ts
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/FluxHarsh/Readme.AI-.git
cd Readme.AI-
```

**2. Install frontend dependencies:**
```bash
npm install
```

**3. Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

**4. Set up environment variables:**
```bash
# In backend/.env
echo "GEMINI_API_KEY=your_gemini_api_key" > backend/.env

# In root .env
echo "VITE_API_URL=http://localhost:3001" > .env
```

**5. Run the app:**
```bash
npm run dev
```

Frontend → `http://localhost:3000`
Backend → `http://localhost:3001`

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (`.env`)
```
VITE_API_URL=https://your-render-backend.onrender.com
```

> ⚠️ Never push `.env` files to GitHub. Add them to `.gitignore`.

---

## 🔌 API Reference

### `POST /api/generate`

Generates a README for the given GitHub repository.

**Request Body:**
```json
{
  "repoUrl": "https://github.com/owner/repo"
}
```

**Success Response:**
```json
{
  "readme": "# Project Title\n..."
}
```

**Error Response:**
```json
{
  "error": "Failed to generate README"
}
```

---

## ☁️ Deployment

### Backend → Render
| Field | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install && npx tsc -b` |
| Start Command | `node dist/server.js` |
| Environment Variable | `GEMINI_API_KEY` |

### Frontend → Vercel
| Field | Value |
|---|---|
| Framework | Vite |
| Root Directory | `.` |
| Environment Variable | `VITE_API_URL` |

---

## 🗺️ Roadmap

- [ ] Support for private repositories via GitHub OAuth
- [ ] Multiple README templates to choose from
- [ ] Edit generated README before downloading
- [ ] Support for GitLab and Bitbucket URLs
- [ ] README history — save previously generated READMEs
- [ ] Dark/Light theme toggle

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Harsh Jagtap** — [@FluxHarsh](https://github.com/FluxHarsh)

⭐ If you found this useful, consider giving it a star!
