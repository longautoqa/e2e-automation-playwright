import { expect as baseExpect } from '@playwright/test';

export const expect = baseExpect.extend({
	toBeNumber(received: any) {
		const isNumber = typeof received == 'number';
		if (isNumber) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected ${received} is a number, but got ${typeof received}`,
				pass: false,
			};
		}
	},
	toBeString(received: any) {
		const isString = typeof received == 'string';
		if (isString) {
			return {
				message: () => 'passed',
				pass: true,
			};
		} else {
			return {
				message: () =>
					`Expected ${received} is a string, but got ${typeof received}`,
				pass: false,
			};
		}
	},
});
