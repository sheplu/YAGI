// @GitHub-API: https://docs.github.com/en/rest/dependabot/alerts

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function getRepository(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listCodeownersErrors(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/codeowners/errors`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listLanguages(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/languages`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listTeams(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/teams`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getTopics(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/topics`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listContributors(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const contributors = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/contributors
				?per_page=${GITHUB_PAGE_LENGTH}&page=${page}`;
			// eslint-disable-next-line no-await-in-loop
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${GITHUB_TOKEN}`,
				},
			});
			// eslint-disable-next-line no-await-in-loop
			const result = await request.json();

			contributors.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return contributors;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing contributors for ${owner}/${repository}`, { cause: error });
	}
};
