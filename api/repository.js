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