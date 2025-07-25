const GITHUB_URL = 'https://api.github.com';
const token = process.env.GITHUB_TOKEN;

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
                    Authorization: `Bearer ${token}`,
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
