// @GitHub-API: https://docs.github.com/en/rest/releases/assets

import { GITHUB_TOKEN } from '../utils/token.js';
import {
	GITHUB_URL,
} from '../utils/const.js';

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
export async function updateRelease(owner, repository, assetID, asset) {
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
