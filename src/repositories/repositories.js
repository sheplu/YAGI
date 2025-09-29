import { GITHUB_TOKEN } from '../utils/token.js';
import { GITHUB_URL } from '../utils/const.js';

export async function getRepository(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listCodeownersErrors(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/codeowners/errors`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listLanguages(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/languages`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listTeams(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/teams`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};
