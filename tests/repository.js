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
} from '../main.js';
import { logger } from '../api/utils.js';
import { writeFileSync } from 'node:fs';

const repo = await getRepository('sheplu', 'aws-safe-modules');

logger.log(repo);
const repoLanguage = await getRepositoryLanguages('sheplu', 'aws-safe-modules');

logger.log(repoLanguage);
const repoTeams = await getRepositoryTeams('sheplu', 'aws-safe-modules');

logger.log(repoTeams);

const repoTopics = await getTopics('sheplu', 'aws-safe-modules');

logger.log(repoTopics);
const repoCodeowner = await getCodeowners('sheplu', 'aws-safe-modules');

logger.log(repoCodeowner);
const repoDependabot = await getDependabot('sheplu', 'aws-safe-modules');

logger.log(repoDependabot);
const repoVuln = await getVulnerabilityReporting('sheplu', 'aws-safe-modules');

logger.log(repoVuln);

const repoCollaborators = await listCollaborators('sheplu', 'aws-safe-modules');

logger.log(repoCollaborators.length);

const repoContributors = await listContributors('sheplu', 'aws-safe-modules');

logger.log(repoContributors.length);

const repos = await listRepositories('not-organisation');

logger.log(repos.length);
writeFileSync('./data', JSON.stringify(repos));
