import { expect as baseExpect } from '@playwright/test';

export const expect = baseExpect.extend({
	toHaveOKStatus(received: any) {
		const pass = received.status() == 200;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 200, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
	toHaveCreatedStatus(received: any) {
		const pass = received.status() == 201;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 201, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
	toHaveNoContentStatus(received: any) {
		const pass = received.status() == 204;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 204, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
	toHaveUnauthorizedStatus(received: any) {
		const pass = received.status() == 401;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 401, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
	toHaveForbiddenStatus(received: any) {
		const pass = received.status() == 403;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 403, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
	toHaveNotFoundStatus(received: any) {
		const pass = received.status() == 404;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 404, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
	toHaveUnprocessableContentStatus(received: any) {
		const pass = received.status() == 422;
		if (pass) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected status code 422, but got ${received.status()}.\nResponse: ${JSON.stringify(received)}`,
				pass: false,
			};
		}
	},
});
