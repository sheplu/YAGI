import {
	getCodeowners,
	getDependabot,
	getRepository,
	getRepositoryLanguages,
	getRepositoryTeams,
	getTopics,
	getVulnerabilityReporting,
	listCollaborators,
	listContributors,
	listRepositories,
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
const repoCodeowner = await getCodeowners('sheplu', 'aws-safe-modules');
console.log(repoCodeowner);
const repoDependabot = await getDependabot('sheplu', 'aws-safe-modules');
console.log(repoDependabot);
const repoVuln = await getVulnerabilityReporting('sheplu', 'aws-safe-modules');
console.log(repoVuln);

const repoCollaborators = await listCollaborators('sheplu', 'aws-safe-modules');
console.log(repoCollaborators.length);

const repoContributors = await listContributors('sheplu', 'aws-safe-modules');
console.log(repoContributors.length);

const repos = await listRepositories('not-organisation');
console.log(repos.length);
writeFileSync('./data', JSON.stringify(repos));
