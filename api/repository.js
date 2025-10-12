import {
	BASE_COUNTER,
	DEFAULT_INCREMENT,
	GITHUB_PAGE_LENGTH,
	GITHUB_TOKEN,
	GITHUB_URL,
	logger,
} from './utils.js';

// @Moved
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

export async function archiveRepository(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
	const request = await fetch(url, {
		body: JSON.stringify({ archived: true }),
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PATCH',
	});

	return request.json();
};

export async function unarchiveRepository(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
	const request = await fetch(url, {
		body: JSON.stringify({ archived: false }),
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PATCH',
	});

	return request.json();
};

export async function updateRepository(owner, repository, body) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
	const request = await fetch(url, {
		body: JSON.stringify(body),
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PATCH',
	});

	return request.json();
};

export async function deleteRepository(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'DELETE',
	});

	return request;
};

export async function listRepositories(owner) {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const repositories = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/repos?
				per_page=${GITHUB_PAGE_LENGTH}&page=${page}`;
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
		throw new Error('Error listing the repositories', { cause: error });
	}
};

// @Moved
export async function listCollaborators(owner, repository, affiliation = 'all') {
	try {
		let page = BASE_COUNTER;
		let continueLoop = true;
		const collaborators = [];

		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/collaborators
				?per_page=${GITHUB_PAGE_LENGTH}&page=${page}&affiliation=${affiliation}`;
			// eslint-disable-next-line no-await-in-loop
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${GITHUB_TOKEN}`,
				},
			});
			// eslint-disable-next-line no-await-in-loop
			const result = await request.json();

			collaborators.push(...result);
			page = page + DEFAULT_INCREMENT;
			if (result.length < GITHUB_PAGE_LENGTH) {
				continueLoop = false;
			}
		}

		return collaborators;
	} catch (error) {
		logger.error(error);
		throw new Error('Error listing the collaborators', { cause: error });
	}
};

// @Moved
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
		throw new Error('Error listing the contributors', { cause: error });
	}
};

// @Moved
export async function getRepositoryLanguages(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/languages`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
export async function getRepositoryTeams(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/teams`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
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

export async function replaceTopics(owner, repository, topics) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/topics`;
	const body = {
		names: topics,
	};

	const request = await fetch(url, {
		body: JSON.stringify(body),
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
		method: 'PUT',
	});

	return request.json();
};

// @Moved
export async function getCodeowners(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/codeowners/errors`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
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

// @Moved
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

// @Moved
export async function listBranches(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
export async function getBranch(owner, repository, branch) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
export async function getBranchProtection(owner, repository, branch) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
export async function getBranchProtectionAdmin(owner, repository, branch) {
	// eslint-disable-next-line @stylistic/max-len
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection/enforce_admins`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
export async function getBranchProtectionPR(owner, repository, branch) {
	// eslint-disable-next-line @stylistic/max-len
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection/required_pull_request_reviews`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getCommitSignProtection(owner, repository, branch) {
	// eslint-disable-next-line @stylistic/max-len
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/branches/${branch}/protection/required_signatures`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
export async function listReleases(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/releases`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

// @Moved
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

export async function listTags(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/tags`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getRepositorySecrets(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/actions/secrets`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getRepositorySecret(owner, repository, secret) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/actions/secrets/${secret}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function listRepositoryEnvs(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};

export async function getRepositoryEnvironment(owner, repository, environment) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/environments/${environment}`;
	const request = await fetch(url, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			Authorization: `Bearer ${GITHUB_TOKEN}`,
		},
	});

	return request.json();
};
