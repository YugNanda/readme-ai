export function extractRepo(repoUrl:string){
const parts = repoUrl.split("/")

return{
    owner: parts[3],
    repo: parts[4]
}
}
