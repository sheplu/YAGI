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