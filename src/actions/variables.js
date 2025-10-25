// @GitHub-API: https://docs.github.com/en/rest/actions/variables

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

/*
 * @doc: https://docs.github.com/en/rest/actions/variables?apiVersion=2022-11-28#list-organization-variables
 */
export async function listOrganizationVariables(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const variables = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/actions/variables
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

			variables.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return variables;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing variables for ${owner}`, { cause: error });
	}
};
