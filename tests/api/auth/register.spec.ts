import { expect, test } from '@fixtures/baseAPIFixture';
import { createRandomUserBody } from '@testDataFactory/auth-data-factory';
import { createHeaders } from '@api/lib/helpers/authHelpers';
import { extractField } from '@apiHelpers/responseHelpers';
import { validateJsonSchema } from '@apiHelpers/validateJsonSchema';
import UserApi from 'src/api/user/userApi';
import { TestType } from 'src/types';

test.describe('Register user API @auth', async () => {
	test(
		'Register new user',
		{
			tag: ['@smoke'],
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-28',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			const userBody = await createRandomUserBody();
			const createUserRes = await userApi.createUser(userBody);

			expect(createUserRes).toHaveCreatedStatus();
			const createUserBody = await createUserRes.json();

			await validateJsonSchema('POST_register_user', 'user', createUserBody);

			const headers = await createHeaders(
				createUserBody.email,
				userBody.password
			);

			const userId = await extractField('id', createUserRes);
			const getUserRes = await userApi.getUser(userId, headers);

			expect(getUserRes).toHaveOKStatus();
			const getUserBody = await getUserRes.json();

			await validateJsonSchema('GET_register_user', 'user', getUserBody);
		}
	);

	test(
		'Register new user with existed email',
		{
			tag: ['@smoke'],
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-29',
			},
		},
		async ({ request }) => {
			const userApi = new UserApi(request);
			// Create 1st user
			const user1Body = await createRandomUserBody();
			const createUser1Res = await userApi.createUser(user1Body);
			const email = await extractField('email', createUser1Res);

			// Create 2nd user
			const user2Body = await createRandomUserBody(email);
			const createUser2Res = await userApi.createUser(user2Body);
			const emailError = await extractField('email', createUser2Res);

			expect(createUser2Res).toHaveUnprocessableContentStatus();
			expect(emailError[0]).toEqual(
				'A customer with this email address already exists.'
			);
		}
	);
});
