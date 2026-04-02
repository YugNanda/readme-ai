import { extractRepo } from "../utils/extractRepo";
import { getRepoData } from "../services/githubService";
import { generateReadme } from "../services/geminiService";

// @ts-ignore
export async function generate(req, res) {
  try {
    // support GET and POST
    const repoUrl = req.body?.repoUrl || req.query?.repoUrl;

    if (!repoUrl) {
      return res.status(400).json({
        error: "repoUrl is required"
      });
    }

    const { owner, repo } = extractRepo(repoUrl);

    const repoData = await getRepoData(owner, repo);

    const readme = await generateReadme(repoData);

    res.json({ readme });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate README",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}