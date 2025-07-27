import { APIRequestContext } from '@playwright/test';
import { RequestOptions, Headers } from './types';
import Env from '@utils/env';

export default class BaseApi {
	readonly request: APIRequestContext;
	protected headers: Headers;
	protected baseUrl: string;

	constructor(request: APIRequestContext, headers: Headers, baseUrl?: string) {
		this.request = request;
		this.headers = headers;
		this.baseUrl = baseUrl || Env.API_URL;
	}

	// Helper method to build full URL
	protected buildUrl(path: string): string {
		return `${this.baseUrl}${path}`;
	}

	// CRUD methods with automatic URL construction
	async get(path: string, options: RequestOptions = {}) {
		return await this.request.get(this.buildUrl(path), {
			headers: this.headers,
			...options,
		});
	}

	async post(path: string, options: RequestOptions = {}) {
		return await this.request.post(this.buildUrl(path), {
			headers: this.headers,
			...options,
		});
	}

	async put(path: string, options: RequestOptions = {}) {
		return await this.request.put(this.buildUrl(path), {
			headers: this.headers,
			...options,
		});
	}

	async patch(path: string, options: RequestOptions = {}) {
		return await this.request.patch(this.buildUrl(path), {
			headers: this.headers,
			...options,
		});
	}

	async delete(path: string, options: RequestOptions = {}) {
		return await this.request.delete(this.buildUrl(path), {
			headers: this.headers,
			...options,
		});
	}
}
