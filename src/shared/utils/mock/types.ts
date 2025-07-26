import { APIResponse } from '@playwright/test';
import { Serializable } from 'worker_threads';

export interface Options {
	body?: string | Buffer;
	contentType?: string;
	headers?: {
		[key: string]: string;
	};
	json?: Serializable;
	path?: string;
	response?: APIResponse;
	status?: number;
}

export interface MockResponseOptions {
	status?: number;
	json?: Serializable;
	headers?: Record<string, string>;
	contentType?: string;
}

export interface MockErrorOptions {
	status: number;
	json?: {
		error?: string;
		message?: string;
		[key: string]: any;
	};
}
