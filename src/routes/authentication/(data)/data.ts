import client from '$lib/api';

export async function getGithubState() {
	return await client.GET('/auths/github/state');
}
