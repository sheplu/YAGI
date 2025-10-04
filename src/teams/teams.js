// @GitHub-API: https://docs.github.com/en/rest/teams/teams

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listTeams(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const teams = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/teams
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

			teams.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return teams;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing teams for ${owner}`, { cause: error });
	}
};

export async function listTeamsRepositories(owner, team) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const repositories = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/teams/${team}/repos
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

			repositories.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return repositories;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing repositories for ${owner} ${team}`, { cause: error });
	}
};

export async function listChildTeams(owner, team) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const teams = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/teams/${team}/teams
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

			teams.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return teams;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing teams for ${owner}`, { cause: error });
	}
};
