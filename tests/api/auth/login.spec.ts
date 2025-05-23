import { expect, test } from '@fixtures/baseAPIFixture';
import Env from '@api/lib/helpers/env';
import { extractField } from 'src/api/lib/helpers/responseHelpers';
import { validateJsonSchema } from 'src/api/lib/helpers/validateJsonSchema';
import UserApi from 'src/api/user/userApi';
import { TestType } from 'src/types';
import { randomPassword, randomString } from 'utils/randomize';

test.describe('Login user @auth', async () => {
	[
		{ email: Env.ADMIN_EMAIL, password: Env.ADMIN_PASSWORD, role: 'Admin' },
		{
			email: Env.CUSTOMER_01_EMAIL,
			password: Env.CUSTOMER_01_PASSWORD,
			role: 'Customer',
		},
	].forEach(({ email, password, role }) => {
		test(
			`Login user as ${role} with valid credentials`,
			{
				tag: ['@smoke'],
				annotation: {
					type: TestType.Test,
					description: 'https://demo.atlassian.net/browse/JIRA-30',
				},
			},
			async ({ request }) => {
				const userApi = new UserApi(request);
				const resp = await userApi.login(email, password);

				expect(resp).toHaveOKStatus();
				const body = await resp.json();

				await validateJsonSchema('GET_login_user', 'user', body);
			}
		);
	});

	test(
		'Login with valid email and invalid password',
		{
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-31',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			const resp = await userApi.login(Env.CUSTOMER_01_EMAIL, randomPassword());
			expect(resp).toHaveUnauthorizedStatus();

			const errorField = await extractField('error', resp);
			expect(errorField).toEqual('Unauthorized');
		}
	);

	test(
		'Login with invalid email and password',
		{
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-31',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			const resp = await userApi.login(randomString(), randomString());
			expect(resp).toHaveUnauthorizedStatus();

			const errorField = await extractField('error', resp);
			expect(errorField).toEqual('Unauthorized');
		}
	);

	test(
		'Login with invalid email and valid password',
		{
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-31',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			const resp = await userApi.login(randomString(), Env.ADMIN_PASSWORD);
			expect(resp).toHaveUnauthorizedStatus();

			const errorField = await extractField('error', resp);
			expect(errorField).toEqual('Unauthorized');
		}
	);

	test(
		'Login with no email and valid password',
		{
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-31',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			const resp = await userApi.login(null, Env.ADMIN_PASSWORD);
			expect(resp).toHaveUnauthorizedStatus();

			const errorField = await extractField('error', resp);
			expect(errorField).toEqual('Invalid login request');
		}
	);
});
