import { GITHUB_TOKEN, GITHUB_URL } from './utils.js';

export async function listTeams(owner) {
	try {
		let page = 1;
		let continueLoop = true;
		const teams = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/teams?per_page=100&page=${page}`;
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${GITHUB_TOKEN}`,
				},
			});
			const result = await request.json();

			teams.push(...result);
			page++;
			if (result.length < 100) {
				continueLoop = false;
			}
		}

		return teams;
	} catch (error) {
		console.error(error);
	}
};

export async function listMembers(owner) {
	try {
		let page = 1;
		let continueLoop = true;
		const members = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/members?per_page=100&page=${page}`;
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${GITHUB_TOKEN}`,
				},
			});
			const result = await request.json();

			members.push(...result);
			page++;
			if (result.length < 100) {
				continueLoop = false;
			}
		}

		return members;
	} catch (error) {
		console.error(error);
	}
};

export async function listPublicMembers(owner) {
	try {
		let page = 1;
		let continueLoop = true;
		const publicMembers = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/public_members?per_page=100&page=${page}`;
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${GITHUB_TOKEN}`,
				},
			});
			const result = await request.json();

			publicMembers.push(...result);
			page++;
			if (result.length < 100) {
				continueLoop = false;
			}
		}

		return publicMembers;
	} catch (error) {
		console.error(error);
	}
};

export async function createRepository(owner, repositoryConfiguration) {
	try {
		const url = `${GITHUB_URL}/orgs/${owner}/repos`;
		const body = repositoryConfiguration;
		const request = await fetch(url, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				Authorization: `Bearer ${GITHUB_TOKEN}`,
			},
			body: JSON.stringify(body),
			method: 'POST',
		});

		return request.json();
	} catch (error) {
		console.error(error);
	}
};

export async function getOrganizationSecrets(owner) {
	const url = `${GITHUB_URL}/orgs/${owner}/actions/secrets`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getOrganizationSecret(owner, secret) {
	const url = `${GITHUB_URL}/orgs/${owner}/actions/secrets/${secret}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getOrganizationVariables(owner) {
	const url = `${GITHUB_URL}/orgs/${owner}/actions/variables`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};
