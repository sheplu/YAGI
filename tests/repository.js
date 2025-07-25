import { getRepository, listRepositories } from "../main.js";
import { writeFileSync } from "node:fs";

const repo = await getRepository('sheplu', 'aws-safe-modules');
console.log(repo)

const repos = await listRepositories('not-organisation');
console.log(repos.length)
writeFileSync('./data', JSON.stringify(repos))