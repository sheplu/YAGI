// @GitHub-API: https://docs.github.com/en/rest/releases/releases

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

export async function listReleases(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const releases = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases
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

			releases.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return releases;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing releases for ${owner}/${repository}`, { cause: error });
	}
};

export async function getLatestRelease(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/latest`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-a-release-by-tag-name
 */
export async function getReleaseByTag(owner, repository, tag) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/tags/${tag}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-a-release
 */
export async function getRelease(owner, repository, release) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/${release}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#update-a-release
 */
export async function updateRelease(owner, repository, releaseID, release) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/${releaseID}`;
	const request = await fetch(url, {
		body: release,
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PATCH',
	});

	return request.json();
};
