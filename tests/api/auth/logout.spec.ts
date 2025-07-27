import { createHeaders } from '@apiUtils/authUtils';
import Env from '@utils/env';
import { expect, test } from '@fixtures/api-test-fixture';
import { extractField } from '@apiUtils/responseUtils';
import UserApi from '@apis/user/userApi';
import { TestType } from 'src/types';

test.describe('Logout user @auth', async () => {
	test(
		'Logout with valid token',
		{
			tag: ['@smoke'],
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-35',
			},
		},
		async ({ request }) => {
			const headers = await createHeaders(
				Env.CUSTOMER_01_EMAIL,
				Env.CUSTOMER_01_PASSWORD
			);
			const userApi = new UserApi(request);
			const resp = await userApi.logout(headers);

			expect(resp).toHaveOKStatus();
			const message = await extractField('message', resp);

			expect(message).toEqual('Successfully logged out');
		}
	);

	test(
		'Logout with non-existed token',
		{
			tag: ['@smoke'],
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-36',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			const resp = await userApi.logout({});

			expect(resp).toHaveUnauthorizedStatus();
			const message = await extractField('message', resp);

			expect(message).toEqual('Unauthorized');
		}
	);
});
