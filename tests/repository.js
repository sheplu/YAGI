import {
	getRepository,
	getRepositoryLanguages,
	getRepositoryTeams,
	getTopics,
	listRepositories,
	replaceTopics
} from "../main.js";
import { writeFileSync } from "node:fs";

const repo = await getRepository('sheplu', 'aws-safe-modules');
console.log(repo);
const repoLanguage = await getRepositoryLanguages('sheplu', 'aws-safe-modules');
console.log(repoLanguage);
const repoTeams = await getRepositoryTeams('sheplu', 'aws-safe-modules');
console.log(repoTeams);

const repoTopics = await getTopics('sheplu', 'aws-safe-modules');
console.log(repoTopics);
const changeTopics = await replaceTopics('sheplu', 'aws-safe-modules', ["a", "b", "123abc"]);
console.log(changeTopics);
const repoTopics2 = await getTopics('sheplu', 'aws-safe-modules');
console.log(repoTopics2);

const repos = await listRepositories('not-organisation');
console.log(repos.length);
writeFileSync('./data', JSON.stringify(repos));
