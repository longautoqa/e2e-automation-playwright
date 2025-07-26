import { APIRequestContext } from '@playwright/test';
import Env from '@utils/env';
import { RegisterUser } from './types';
import BaseApi, { Headers } from '../baseAPI';

export default class UserApi extends BaseApi {
	static readonly USER = 'users';
	static readonly LOGIN = `${UserApi.USER}/login`;
	static readonly LOGOUT = `${UserApi.USER}/logout`;
	static readonly REGISTER_USER = `${UserApi.USER}/register`;
	static readonly FORGOT_PASSWORD = `${UserApi.USER}/forgot-password`;
	static readonly CHANGE_PASSWORD = `${UserApi.USER}/change-password`;
	static readonly REFRESH_TOKEN = `${UserApi.USER}/refresh`;

	constructor(request: APIRequestContext, headers: Headers = {}) {
		super(request, headers);
	}

	async login(email: string, password: string) {
		return await this.request.post(`${Env.API_URL}${UserApi.LOGIN}`, {
			data: {
				email,
				password,
			},
		});
	}

	async logout(headers: Headers) {
		return await this.request.get(`${Env.API_URL}${UserApi.LOGOUT}`, {
			headers: headers,
		});
	}

	async createUser(body: RegisterUser) {
		return await this.request.post(`${Env.API_URL}${UserApi.REGISTER_USER}`, {
			data: body,
		});
	}

	async deleteUser(userId: string, headers: Headers) {
		return await this.request.delete(
			`${Env.API_URL}${UserApi.USER}/${userId}`,
			{
				headers: headers,
			}
		);
	}

	async getUser(userId: string, headers: Headers) {
		return await this.request.get(`${Env.API_URL}${UserApi.USER}/${userId}`, {
			headers: headers,
		});
	}
}
