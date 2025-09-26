import {
	archiveRepository,
	createRepository,
	listMembers,
	listTeams,
	unarchiveRepository,
} from '../main.js';
import { deleteRepository, updateRepository } from '../api/repository.js';
import { logger } from '../api/utils.js';

const organizationTeam = await listTeams('not-organisation');

logger.log(organizationTeam.length);

const organizationMembers = await listMembers('not-organisation');

logger.log(organizationMembers.length);

const createRepo = await createRepository('not-organisation', {
	'allow_merge_commit': false,
	'allow_squash_merge': false,
	'auto_init': true,
	'delete_branch_on_merge': true,
	'description': 'This is your first repository',
	'has_issues': true,
	'has_projects': true,
	'has_wiki': true,
	'homepage': 'https://github.com',
	'name': 'My-new-repo',
	'private': true,
});

logger.log(createRepo);

const updateRepo = await updateRepository('not-organisation', 'My-new-repo', {
	description: 'This is your second repository',
	homepage: 'https://google.com',
});

logger.log(updateRepo);

const archive = await archiveRepository('not-organisation', 'My-new-repo');

logger.log(archive);

const unarchive = await unarchiveRepository('not-organisation', 'My-new-repo');

logger.log(unarchive);

const deleteRepo = await deleteRepository('not-organisation', 'My-new-repo');

logger.log(deleteRepo);
