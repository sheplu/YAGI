// @GitHub-API: https://docs.github.com/en/rest/branches/branches

import { GITHUB_TOKEN } from '../utils/token.js';
import { GITHUB_URL } from '../utils/const.js';

export async function listBranches(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};
