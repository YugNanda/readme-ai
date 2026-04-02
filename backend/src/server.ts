import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

app.get("/", (req, res) => {
  res.send("README AI API running 🚀");
});

app.post("/api/generate", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        error: "Repository URL required",
      });
    }

    const match = repoUrl.match(
      /github\.com\/([^\/]+)\/([^\/]+)/
    );

    const owner = match?.[1];
    const repo = match?.[2];

    /* ---------------- repo info ---------------- */

    const repoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const repoData = await repoRes.json();

    /* ---------------- languages ---------------- */

    const langRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`
    );

    const languages = await langRes.json();
    const techStack = Object.keys(languages).join(", ");

    /* ---------------- folder tree ---------------- */

    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
    );

    const treeData = await treeRes.json();

    const files =
      treeData?.tree
        ?.slice(0, 40)
        .map((f: any) => f.path)
        .join("\n") || "";

    /* ---------------- TRY AI ---------------- */

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        const prompt = `
Generate professional GitHub README.

Repo: ${repoUrl}
Name: ${repoData.name}
Description: ${repoData.description}
Languages: ${techStack}

Files:
${files}

Return markdown only.
`;

        const result = await model.generateContent(prompt);
        const readme = result.response.text();

        return res.json({ readme });

      } catch (aiError) {
        console.log("AI failed, using fallback...");
      }
    }

    /* ---------------- FALLBACK GENERATOR ---------------- */

    const readme = `# ${repoData.name}

${repoData.description || "Project description"}

---

## 🚀 AI Summary

${repoData.name} is a modern project built using ${techStack}.  
This repository provides scalable architecture, clean structure and production ready setup.

---

## ✨ Features

- Clean architecture
- Modular structure
- Easy deployment
- Scalable design
- Developer friendly

---

## 🧠 Tech Stack

${techStack}

---

## 📁 Folder Structure

\`\`\`
${files.split("\n").slice(0, 15).join("\n")}
\`\`\`

---

## 📦 Installation

\`\`\`bash
git clone ${repoUrl}
cd ${repo}
npm install
\`\`\`

---

## ▶️ Usage

\`\`\`bash
npm run dev
\`\`\`

---

## 📡 API Docs

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api | GET | Base API |
| /api/data | GET | Fetch data |
| /api/create | POST | Create item |

---

## 💡 Example

\`\`\`js
fetch("/api/data")
  .then(res => res.json())
\`\`\`

---

## 🤝 Contributing

Pull requests are welcome.

---

## 📄 License

MIT
`;

    res.json({ readme });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "README generation failed",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});