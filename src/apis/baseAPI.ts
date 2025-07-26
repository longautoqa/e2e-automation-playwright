import { APIRequestContext } from '@playwright/test';

export type Headers = {
	[key: string]: string;
};

export default class BaseAPI {
	readonly request: APIRequestContext;
	protected headers: Headers;

	constructor(request: APIRequestContext, headers: Headers) {
		this.request = request;
		this.headers = headers;
	}
}
