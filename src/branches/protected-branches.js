// @GitHub-API: https://docs.github.com/en/rest/branches/branch-protection

import { GITHUB_TOKEN } from '../utils/token.js';
import { GITHUB_URL } from '../utils/const.js';

export async function getBranchProtection(owner, repository, branch) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getBranchProtectionPR(owner, repository, branch) {
	// eslint-disable-next-line @stylistic/max-len
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection/required_pull_request_reviews`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getBranchProtectionAdmin(owner, repository, branch) {
	// eslint-disable-next-line @stylistic/max-len
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection/enforce_admins`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};
