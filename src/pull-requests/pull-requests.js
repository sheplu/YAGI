// @GitHub-API: https://docs.github.com/en/rest/pulls/pulls

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listPullRequests(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const pullRequests = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/pulls
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

			pullRequests.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return pullRequests;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing pull requests for ${owner}/${repository}`, { cause: error });
	}
};

export async function getPullRequest(owner, repository, pullRequestID) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/pulls/${pullRequestID}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listPullRequestCommits(owner, repository, pullRequestID) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const commits = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/pulls/${pullRequestID}/commits
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

			commits.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return commits;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing pull requests for ${owner}/${repository}`, { cause: error });
	}
};
