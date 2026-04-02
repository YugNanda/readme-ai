/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Wand2,
  Link as LinkIcon,
  Zap,
  Copy,
  Download,
  CheckCircle2,
  FileCode2,
  Sparkles,
  LayoutTemplate,
  Check,
  Github,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const defaultMarkdownContent = `# Smart Attendance System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-purple)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange)

An **AI-powered attendance tracking platform** that uses facial recognition and biometric synchronization to automate attendance for modern workplaces and classrooms.

Designed to reduce manual tracking and provide **real-time analytics, accurate identification, and seamless integration with existing systems**.

---

## Features

- **AI Face Recognition** — Detect and verify users using OpenCV-based models  
- **Real-time Attendance Tracking** — Instant updates across connected devices  
- **Analytics Dashboard** — Visualize attendance trends and insights  
- **Secure API Endpoints** — Role-based access with protected routes  
- **Modular Architecture** — Easy to extend and integrate with other services

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + TypeScript |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI / Vision | OpenCV |
| Deployment | Docker + Cloud Hosting |

---

## Installation

Clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/username/smart-attendance.git
cd smart-attendance
npm install
\`\`\`

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Open your browser and navigate to:

\`http://localhost:3000\`

---

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| \`/api/v1/attendance\` | GET | Fetch all attendance records |
| \`/api/v1/verify\` | POST | Verify face against database |
| \`/api/v1/stats\` | GET | Get attendance analytics |

---

## Screenshots

| Dashboard | Face Detection |
|-----------|----------------|
| Attendance analytics view | Real-time face verification |

*(Your AI can automatically insert screenshots if available in the repo.)*

---

## Project Structure

\`\`\`text
smart-attendance/
│
├── frontend/        # React client
├── backend/         # Node.js API
├── models/          # Database models
├── services/        # AI recognition services
└── README.md
\`\`\`

---

## Deployment

Build and run using Docker:

\`\`\`bash
docker build -t smart-attendance .
docker run -p 3000:3000 smart-attendance
\`\`\`

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please ensure code follows project linting rules.

---

## License

This project is licensed under the MIT License.
`;

export default function App() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(
    defaultMarkdownContent,
  );
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Validate GitHub URL
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    if (!githubRegex.test(url)) {
      setUrlError("Invalid GitHub URL");
      return;
    }

    setUrlError("");
    setIsGenerating(true);
    
    try {
      
      // @ts-ignore
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl: url }),
      });

      if (!response.ok) {
        // throw new Error("Failed to generate README");
          throw new Error("Service temporarily unavailable due to heavy usage. Free README generation has been paused.");

      }

      const data = await response.json();
      setMarkdownContent(data.readme);
      scrollToSection("examples");
    } catch (error) {
      console.error(error);
      // setUrlError("Failed to generate README. Please try again.");
        setUrlError("Service temporarily unavailable due to heavy usage. Free README generation has been paused.");

    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const urlObj = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObj;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(urlObj);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-lime-500/30">
      {/* Custom Cursor */}
      <div
        className="fixed top-0 left-0 w-3 h-3 bg-lime-400 rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out shadow-[0_0_10px_rgba(132,204,22,0.5)] hidden md:block"
        style={{
          transform: `translate3d(${cursorPos.x - 6}px, ${cursorPos.y - 6}px, 0)`,
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-lime-400 p-1.5 rounded-md flex items-center justify-center text-zinc-950">
              <Wand2 size={20} strokeWidth={2.5} />
            </div>
            <span className="font-['Outfit'] text-2xl font-bold tracking-tight text-white">
              Readme.AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="hover:text-lime-400 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-lime-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("examples")}
              className="hover:text-lime-400 transition-colors"
            >
              Examples
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Contact us
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section
          id="how-it-works"
          className="relative pt-24 pb-20 px-6 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-8">
              <Sparkles size={14} className="text-lime-400" />
              Powered by Google AI
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Generate a GitHub{" "}
              <Github className="inline-block w-10 h-10 md:w-14 md:h-14 mx-1 -mt-2 text-white animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />{" "}
              README <br />
              <span className="relative inline-block mt-2 -rotate-2">
                <span className="font-['Caveat'] text-lime-400 font-bold text-6xl md:text-8xl">
                  instantly!!
                </span>
                <svg
                  className="absolute w-full h-3 md:h-4 -bottom-1 md:-bottom-2 left-0 text-lime-400 opacity-90"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 5 Q 50 9 98 2"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="font-['Outfit'] text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Transform your repository into a beautifully structured,
              production-ready document. <br className="hidden sm:block" />
              Skip the boilerplate and let AI craft your perfect README.
            </p>

            <form
              onSubmit={handleGenerate}
              className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1 flex flex-col">
                <div className="relative flex-1 flex items-center">
                  <LinkIcon
                    className="absolute left-4 text-zinc-500"
                    size={20}
                  />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (urlError) setUrlError("");
                    }}
                    placeholder="https://github.com/user/repo"
                    className={`w-full h-14 pl-12 pr-4 bg-zinc-900/50 border ${urlError ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "border-zinc-800 focus:ring-lime-400/50 focus:border-lime-400"} rounded-xl focus:ring-2 transition-all outline-none text-white placeholder:text-zinc-500`}
                    required
                  />
                </div>
                {urlError && (
                  <span className="text-red-500 text-sm mt-2 text-left pl-2">
                    {urlError}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className="h-14 px-8 bg-lime-400 hover:bg-lime-500 disabled:opacity-70 disabled:cursor-not-allowed text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  <>
                    Generate README
                    <Zap size={18} className="fill-zinc-950" />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Preview Section */}
        <section id="examples" className="px-6 pb-24 mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Live Preview
            </h2>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-800 hover:bg-zinc-900 text-zinc-300 transition-colors"
              >
                {copied ? (
                  <Check size={16} className="text-lime-400" />
                ) : (
                  <Copy size={16} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d0d] shadow-2xl">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2 ml-2 text-zinc-400">
                  <FileCode2 size={16} />
                  <span className="text-xs font-mono">README.md</span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 px-2 py-0.5 bg-lime-400/10 rounded">
                Rendered
              </span>
            </div>

            {/* Editor Content */}

            <div className="p-8 md:p-12 font-sans text-zinc-300 leading-relaxed overflow-x-auto">
              <div className="max-w-3xl mx-auto [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-4 [&>h1]:pb-6 [&>h1]:border-b [&>h1]:border-zinc-800 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:pb-4 [&>h2]:border-b [&>h2]:border-zinc-800 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>p]:text-zinc-300 [&>ul]:mb-4 [&>ul]:space-y-2 [&>ul]:pl-4 [&>ol]:mb-4 [&>ol]:space-y-2 [&>ol]:pl-4 [&>li]:text-zinc-300 [&>pre]:bg-zinc-900 [&>pre]:border [&>pre]:border-zinc-800 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:mb-4 [&>pre]:overflow-x-auto [&>code]:text-lime-400 [&>code]:font-mono [&>code]:text-sm [&>table]:w-full [&>table]:border-collapse [&>table]:mb-4 [&>th]:bg-zinc-900 [&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:text-zinc-400 [&>th]:border-b [&>th]:border-zinc-800 [&>td]:px-4 [&>td]:py-3 [&>td]:border-b [&>td]:border-zinc-800 [&>hr]:border-zinc-800 [&>hr]:my-8 [&>blockquote]:border-l-4 [&>blockquote]:border-lime-400 [&>blockquote]:pl-4 [&>blockquote]:text-zinc-400">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
{/* 
            <div className="p-8 md:p-12 font-sans text-zinc-300 leading-relaxed overflow-x-auto">
              <div className="max-w-3xl mx-auto prose prose-invert prose-headings:text-white prose-a:text-lime-400 prose-code:text-lime-300 prose-strong:text-white max-w-none">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div> */}
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="px-6 py-24 border-t border-zinc-900 bg-zinc-950/50"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-white mb-4">
                Everything you need to{" "}
                <span className="text-lime-400">stand out</span>
              </h2>
              <p className="font-['Outfit'] text-zinc-400 max-w-2xl mx-auto text-lg">
                Save hours of manual documentation with our intelligent parser.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 mb-6 transition-all duration-300">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-white mb-3 transition-colors">
                  Instant Analysis
                </h3>
                <p className="font-['Outfit'] text-zinc-400 text-sm leading-relaxed">
                  We scan your code structure automatically to determine
                  functionality and setup steps.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 mb-6 transition-all duration-300">
                  <LayoutTemplate size={24} />
                </div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-white mb-3 transition-colors">
                  Pro Formatting
                </h3>
                <p className="font-['Outfit'] text-zinc-400 text-sm leading-relaxed">
                  Get consistent styles, badges, and professional markdown
                  architecture for every project.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400 mb-6 transition-all duration-300">
                  <FileCode2 size={24} />
                </div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-white mb-3 transition-colors">
                  SEO Optimized
                </h3>
                <p className="font-['Outfit'] text-zinc-400 text-sm leading-relaxed">
                  Rank higher in GitHub searches with relevant keywords and
                  structured metadata.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-zinc-900 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <div className="bg-lime-400/20 p-1 rounded flex items-center justify-center">
              <Wand2 size={16} className="text-lime-400" />
            </div>
            <span className="font-['Outfit'] font-semibold text-white">
              Readme.AI
            </span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-lime-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              Terms
            </a>
            <a href="https://x.com/HarshJagtap843" target="blank" className="hover:text-lime-400 transition-colors">
              Twitter
            </a>
            <a href="https://github.com/FluxHarsh" target="blank" className="hover:text-lime-400 transition-colors">
              GitHub
            </a>
          </div>
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Readme.AI. Documentation redefined.
          </p>
        </div>
      </footer>
    </div>
  );
}
