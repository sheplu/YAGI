// @GitHub-API: https://docs.github.com/en/rest/meta/meta

import { GITHUB_TOKEN } from '../utils/token.js';
import {
	GITHUB_URL,
} from '../utils/const.js';

export async function getZen() {
	const url = `${GITHUB_URL}/zen`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
		},
	});

	return request.json();
};
