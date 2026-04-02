//@ts-ignore
export async function getRepoData(owner, repo){
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await res.json();

    return{
        name:data.name,
        description:data.description,
        languages:data.language,
        stars:data.stargazers_count,
        forks:data.forks
    }
}
