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
