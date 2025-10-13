// @doc: https://docs.github.com/en/rest/repos/repos

import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_URL,
} from '../utils/const.js';
import { GITHUB_TOKEN } from '../utils/token.js';
import { logger } from '../utils/logger.js';

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories
 */
export async function listRepositories(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const repositories = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/repos
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

			repositories.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return repositories;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing repositories for ${owner}`, { cause: error });
	}
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-an-organization-repository
 */
export async function createRepository(owner, repository) {
	const url = `${GITHUB_URL}/orgs/${owner}/repos`;
	const request = await fetch(url, {
		body: repository,
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'POST',
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
 */
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

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#update-a-repository
 */
export async function updateRepository(owner, repository, update) {
	const url = `${GITHUB_URL}/orgs/${owner}/${repository}`;
	const request = await fetch(url, {
		body: update,
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PATCH',
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#delete-a-repository
 */
export async function deteleRepository(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
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
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-activities
 */
// eslint-disable-next-line max-statements
export async function listActivities(owner, repository, query) {
	try {
		const queryString = new URLSearchParams(query).toString();
		let page = BASE_COUNTER;
		let continueLoop = true;
		const contributors = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/activity
				?per_page=${GITHUB_PAGE_LENGTH}&page=${page}&${queryString}`;
			// eslint-disable-next-line no-await-in-loop
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${GITHUB_TOKEN}`,
				},
			});
			// eslint-disable-next-line no-await-in-loop
			const result = await request.json();

			contributors.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return contributors;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing contributors for ${owner}/${repository}`, { cause: error });
	}
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-an-attestation
 */
export async function createAttestation(owner, repository, attestation) {
	const url = `${GITHUB_URL}/orgs/${owner}/${repository}/attestations`;
	const request = await fetch(url, {
		body: attestation,
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'POST',
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#check-if-dependabot-security-updates-are-enabled-for-a-repository
 */
export async function getDependabot(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/automated-security-fixes`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-codeowners-errors
 */
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

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors
 */
export async function listContributors(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const contributors = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/contributors
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

			contributors.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return contributors;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing contributors for ${owner}/${repository}`, { cause: error });
	}
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#check-if-immutable-releases-are-enabled-for-a-repository
 */
export async function getImmutableRelease(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/immutable-releases`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-languages
 */
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

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#check-if-private-vulnerability-reporting-is-enabled-for-a-repository
 */
export async function getVulnerabilityReporting(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/private-vulnerability-reporting`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-tags
 */
export async function listTags(owner, repository) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const tags = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/tags
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

			tags.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return tags;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing tags for ${owner}`, { cause: error });
	}
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-teams
 */
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

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-all-repository-topics
 */
export async function getTopics(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/topics`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#replace-all-repository-topics
 */
export async function replaceTopics(owner, repository, topics) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/topics`;
	const request = await fetch(url, {
		body: {
			names: topics,
		},
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'POST',
	});

	return request.json();
};

/*
 * @doc: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
 */
export async function listUserRepositories(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const repositories = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/users/${owner}/repos
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

			repositories.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return repositories;
	} catch (error) {
		logger.error(error);
		throw new Error(`Error listing repositories for ${owner}`, { cause: error });
	}
};
