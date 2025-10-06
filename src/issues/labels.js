// @GitHub-API: https://docs.github.com/en/rest/issues/labels

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listLabels(owner, repository, issue) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const labels = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/issues/${issue}/labels
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

			labels.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return labels;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing labels for ${owner}/${repository}/issue`, { cause: error });
	}
};

export async function removeLabels(owner, repository, issue) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/issues/${issue}/labels`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'DELETE',
	});

	return request.json();
};

export async function removeLabel(owner, repository, issue, label) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/issues/${issue}/labels/${label}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'DELETE',
	});

	return request.json();
};
