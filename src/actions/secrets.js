// @GitHub-API: https://docs.github.com/en/rest/actions/secrets

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

/*
 * @doc: https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#list-organization-secrets
 */
export async function listOrganizationSecrets(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const secrets = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/actions/secrets
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

			secrets.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return secrets;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing secrets for ${owner}`, { cause: error });
	}
};

/*
 * @doc: https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#list-repository-secrets
 */
export async function listRepositorySecrets(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const secrets = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/actions/secrets
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

			secrets.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return secrets;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing secrets for ${owner}/${repository}`, { cause: error });
	}
};

/*
 * @doc: https://docs.github.com/en/rest/actions/secrets?apiVersion=2022-11-28#list-environment-secrets
 */
export async function listEnvironmentSecrets(owner, repository, environment) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const secrets = [];

		while (continueLoop) {
			// eslint-disable-next-line @stylistic/max-len
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments/${environment}/secrets
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

			secrets.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return secrets;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing secrets for ${owner}/${repository}`, { cause: error });
	}
};
