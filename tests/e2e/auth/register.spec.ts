import { createRandomUserBody } from '@testDataFactory/auth-data-factory';
import { test } from '@fixtures/baseUIFixture';
import { TestType } from 'src/types';

test.describe('Register user feature @auth', async () => {
	test(
		'Register new user successfully',
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-26',
			},
		},
		async ({
			homePage,
			navComponent,
			loginPage,
			registerPage,
			accountPage,
		}) => {
			const userData = await createRandomUserBody();

			await homePage.open();
			await homePage.expectNavigateToHomePage();
			await navComponent.clickSignInLink();
			await navComponent.expectNavigateToLoginPage();
			await loginPage.clickRegisterLink();
			await navComponent.expectNavigateToRegisterPage();
			await registerPage.fillRegisterUser(userData);
			await registerPage.clickRegister();
			await navComponent.expectNavigateToLoginPage();
			await loginPage.loginComponent.login(userData.email, userData.password);
			await accountPage.expectNavigateToAccountPage();
		}
	);

	test(
		'Validate register user',
		{
			tag: '@smoke',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-27',
			},
		},
		async ({ registerPage, navComponent }) => {
			const userData = await createRandomUserBody();

			await navComponent.openRegisterPageURL();
			await navComponent.expectNavigateToRegisterPage();
			await registerPage.clickRegister();
			await registerPage.expectAllFieldsRequiredErrorMsgs();
			await registerPage.fillRegisterUser(userData);
			await registerPage.expectRegisterFormWithNoErrorMsgs();
		}
	);
});
