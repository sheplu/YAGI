// @GitHub-API: https://docs.github.com/en/rest/deployments/environments

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listEnvironments(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const environments = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments
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

			environments.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return environments;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing environments for ${owner}/${repository}`, { cause: error });
	}
};

export async function getEnvironment(owner, repository, environment) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments/${environment}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function createOrUpdateEnvironment(owner, repository, environmentName, environment) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments/${environmentName}`;
	const request = await fetch(url, {
		body: environment,
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'DELETE',
	});

	return request.json();
};

export async function deleteEnvironment(owner, repository, environment) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments/${environment}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'DELETE',
	});

	return request.json();
};
