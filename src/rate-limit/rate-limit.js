// @GitHub-API: https://docs.github.com/en/rest/pulls/pulls

import { GITHUB_TOKEN } from '../utils/token.js';
import {
	GITHUB_URL,
} from '../utils/const.js';

export async function getRateLimit() {
	const url = `${GITHUB_URL}/rate_limits`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};
