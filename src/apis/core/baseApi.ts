import { APIRequestContext } from '@playwright/test';
import { RequestOptions, Headers } from './types';
import Env from '@utils/env';

export default class BaseApi {
	readonly request: APIRequestContext;
	protected headers: Headers;
	protected baseUrl: string;

	// Default headers for all API requests
	private readonly defaultHeaders: Headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};

	constructor(request: APIRequestContext, headers: Headers, baseUrl?: string) {
		this.request = request;
		this.headers = headers;
		this.baseUrl = baseUrl || Env.API_URL;
	}

	// Helper method to build full URL with proper slash handling
	protected buildUrl(path: string): string {
		// Remove leading slash from path if it exists
		const cleanPath = path.startsWith('/') ? path.slice(1) : path;
		// Ensure baseUrl ends with slash
		const cleanBaseUrl = this.baseUrl.endsWith('/')
			? this.baseUrl
			: `${this.baseUrl}/`;

		return `${cleanBaseUrl}${cleanPath}`;
	}

	// Private common method to handle all HTTP operations
	private async makeRequest(
		method: 'get' | 'post' | 'put' | 'patch' | 'delete',
		path: string,
		options: RequestOptions = {}
	) {
		const url = this.buildUrl(path);
		const mergedHeaders = {
			...this.defaultHeaders,
			...this.headers,
			...options.headers,
		};

		const requestOptions = {
			...options,
			headers: mergedHeaders,
		};

		return await this.request[method](url, requestOptions);
	}

	// CRUD methods using the common request handler
	async get(path: string, options: RequestOptions = {}) {
		return await this.makeRequest('get', path, options);
	}

	async post(path: string, options: RequestOptions = {}) {
		return await this.makeRequest('post', path, options);
	}

	async put(path: string, options: RequestOptions = {}) {
		return await this.makeRequest('put', path, options);
	}

	async patch(path: string, options: RequestOptions = {}) {
		return await this.makeRequest('patch', path, options);
	}

	async delete(path: string, options: RequestOptions = {}) {
		return await this.makeRequest('delete', path, options);
	}
}
