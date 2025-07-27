const GITHUB_URL = 'https://api.github.com';
const token = process.env.GITHUB_TOKEN;

export async function createRepository(owner, repositoryConfiguration) {
	try {
		const url = `${GITHUB_URL}/user/repos`
		const body = repositoryConfiguration
		const request = await fetch(url, {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(body),
			method: "POST"
		})

		return request.json();
	} catch (error) {
		console.error(error)
	}
};
