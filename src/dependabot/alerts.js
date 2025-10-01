// @GitHub-API: https://docs.github.com/en/rest/dependabot/alerts

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listAlertsRepository(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const alerts = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/dependabot/alerts
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

			alerts.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return alerts;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing alerts for ${owner}/${repository}`, { cause: error });
	}
};
