import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_TOKEN,
	GITHUB_URL,
	logger,
} from './utils.js';

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
		throw new Error('Error listing the teams', { cause: error });
	}
};

export async function listMembers(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const members = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/members
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

			members.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return members;
	} catch (error) {
		logger.error(error);
		throw new Error('Error listing the members', { cause: error });
	}
};

export async function listPublicMembers(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const publicMembers = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/public_members
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

			publicMembers.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return publicMembers;
	} catch (error) {
		logger.error(error);
		throw new Error('Error listing the public members', { cause: error });
	}
};

export async function createRepository(owner, repositoryConfiguration) {
	try {
		const url = `${GITHUB_URL}/orgs/${owner}/repos`;
		const body = repositoryConfiguration;
		const request = await fetch(url, {
			body: JSON.stringify(body),
			headers: {
				Accept: 'application/vnd.github.v3+json',
				Authorization: `Bearer ${GITHUB_TOKEN}`,
			},
			method: 'POST',
		});

		return request.json();
	} catch (error) {
		logger.error(error);
		throw new Error('Error creating the repository', { cause: error });
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
