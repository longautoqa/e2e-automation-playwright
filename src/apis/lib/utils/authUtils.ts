import UserApi from '@apis/user/userApi';
import { expect, request } from '@playwright/test';

export async function getAccessToken(email: string, password: string) {
	const userApi = new UserApi(await request.newContext(), {});
	const resp = await userApi.login(email, password);

	expect(resp.status()).toEqual(200);
	const body = await resp.json();

	return body['access_token'];
}

export async function createHeaders(email: string, password: string) {
	const headers = {};
	const token = await getAccessToken(email, password);

	headers['Authorization'] = `Bearer ${token}`;
	headers['Accept'] = 'application/json';
	headers['Content-Type'] = 'application/json';

	return headers;
}
