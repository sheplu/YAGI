// @GitHub-API: https://docs.github.com/en/rest/orgs/members

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listMembers(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const members = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/members
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

			members.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return members;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing members for ${owner}`, { cause: error });
	}
};

export async function listPublicMembers(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const members = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/public_members
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

			members.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return members;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing public members for ${owner}`, { cause: error });
	}
};
