import { APIRequestContext } from '@playwright/test';
import { RegisterUser } from './types';
import BaseApi from '@apisCore/baseApi';
import { Headers } from '@apisCore/types';

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
		return await this.post(UserApi.LOGIN, {
			data: {
				email,
				password,
			},
		});
	}

	async logout(headers: Headers) {
		return await this.get(UserApi.LOGOUT, { headers });
	}

	async createUser(body: RegisterUser) {
		return await this.post(UserApi.REGISTER_USER, { data: body });
	}

	async deleteUser(userId: string, headers: Headers) {
		return await this.delete(`${UserApi.USER}/${userId}`, { headers });
	}

	async getUser(userId: string, headers: Headers) {
		return await this.get(`${UserApi.USER}/${userId}`, { headers });
	}
}
