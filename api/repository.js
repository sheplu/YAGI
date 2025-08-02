const GITHUB_URL = 'https://api.github.com';
const token = process.env.GITHUB_TOKEN;

export async function getRepository(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
    });

    return request.json();
};

export async function archiveRepository(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
		body: JSON.stringify({ archived: true }),
		method: 'PATCH'
    });

    return request.json();
};

export async function unarchiveRepository(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
		body: JSON.stringify({ archived: false }),
		method: 'PATCH'
    });

    return request.json();
};

export async function updateRepository(owner, repository, body) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
		body: JSON.stringify(body),
		method: 'PATCH'
    });

    return request.json();
};

export async function deleteRepository(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
		method: 'DELETE'
    });

    return request;
};

export async function listRepositories(owner) {
	try {
		let page = 1;
		let continueLoop = true;
		const repositories = [];
		while (continueLoop) {
			const url = `${GITHUB_URL}/orgs/${owner}/repos?per_page=100&page=${page}`;
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${token}`,
				},
			});
            const result = await request.json();
			repositories.push(...result);
			page++;
			if (result.length < 100) {
				continueLoop = false;
			}
		}
		return repositories;
	} catch (error) {
		console.error(error);
	}
};

export async function listCollaborators(owner, repository, affiliation = 'all') {
	try {
		let page = 1;
		let continueLoop = true;
		const collaborators = [];
		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/collaborators?per_page=100&page=${page}&affiliation=${affiliation}`;
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${token}`,
				},
			});
            const result = await request.json();
			collaborators.push(...result);
			page++;
			if (result.length < 100) {
				continueLoop = false;
			}
		}
		return collaborators;
	} catch (error) {
		console.error(error);
	}
};

export async function listContributors(owner, repository) {
	try {
		let page = 1;
		let continueLoop = true;
		const contributors = [];
		while (continueLoop) {
			const url = `${GITHUB_URL}/repos/${owner}/${repository}/contributors?per_page=100&page=${page}`;
			const request = await fetch(url, {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					Authorization: `Bearer ${token}`,
				},
			});
            const result = await request.json();
			contributors.push(...result);
			page++;
			if (result.length < 100) {
				continueLoop = false;
			}
		}
		return contributors;
	} catch (error) {
		console.error(error);
	}
};

export async function getRepositoryLanguages(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}/languages`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
    });
    return request.json();
};

export async function getRepositoryTeams(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}/teams`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
    });
    return request.json();
};

export async function getTopics(owner, repository) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/topics`
	const request = await fetch(url, {
		headers: {
			'Accept': 'application/vnd.github.v3+json',
			'Authorization': `Bearer ${token}`
		},
	})
	return request.json();
};

export async function replaceTopics(owner, repository, topics) {
	const url = `${GITHUB_URL}/repos/${owner}/${repository}/topics`
	const body = {
		"names": topics
	}

	const request = await fetch(url, {
		headers: {
			'Accept': 'application/vnd.github.v3+json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(body),
		method: "PUT"
	})
	return request.json();
};

export async function getCodeowners(owner, repository) {
    const url = `${GITHUB_URL}/repos/${owner}/${repository}/codeowners/errors`;
    const request = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
        },
    });
    return request.json();
};
