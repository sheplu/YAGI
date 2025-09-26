import {
	GITHUB_TOKEN,
	GITHUB_URL,
	logger,
} from './utils.js';

export async function createRepository(repositoryConfiguration) {
	try {
		const url = `${GITHUB_URL}/user/repos`;
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
