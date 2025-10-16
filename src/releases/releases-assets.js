// @GitHub-API: https://docs.github.com/en/rest/releases/assets

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

/*
 * @doc: https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#get-a-release-asset
 */
export async function getReleaseAsset(owner, repository, assetID) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/assets/${assetID}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#update-a-release-asset
 */
export async function updateReleaseAsset(owner, repository, assetID, asset) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/assets/${assetID}`;
	const request = await fetch(url, {
		body: asset,
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PATCH',
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#delete-a-release-asset
 */
export async function deleteReleaseAsset(owner, repository, assetID) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/assets/${assetID}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'DELETE',
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#list-release-assets
 */
export async function listReleasesAsset(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const releases = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases/assets
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
		throw new Error(
			`Error listing releases assets for ${owner}/${repository}`,
			{ cause: error },
		);
	}
};
