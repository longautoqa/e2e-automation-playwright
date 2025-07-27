import { Serializable } from 'playwright-core/types/structs';

// Define the request options type based on Playwright's API
export type RequestOptions = {
	params?: { [key: string]: string | number | boolean };
	headers?: { [key: string]: string };
	data?: string | Buffer | Serializable;
	timeout?: number;
	failOnStatusCode?: boolean;
	ignoreHTTPSErrors?: boolean;
};

export type Headers = {
	[key: string]: string;
};
