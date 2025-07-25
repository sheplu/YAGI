import { getRepository, getRepositoryLanguages, getRepositoryTeams, listRepositories } from "../main.js";
import { writeFileSync } from "node:fs";

const repo = await getRepository('sheplu', 'aws-safe-modules');
console.log(repo)
const repoLanguage = await getRepositoryLanguages('sheplu', 'aws-safe-modules');
console.log(repoLanguage)
const repoTeams = await getRepositoryTeams('sheplu', 'aws-safe-modules');
console.log(repoTeams)

const repos = await listRepositories('not-organisation');
console.log(repos.length)
writeFileSync('./data', JSON.stringify(repos))