import { logger } from '../api/utils.js';
import { userCreateRepository } from '../main.js';

const createRepo = await userCreateRepository('sheplu', {
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
