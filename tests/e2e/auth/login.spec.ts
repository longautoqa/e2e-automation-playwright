import { test } from '@fixtures/baseUIFixture';
import { TestType } from 'src/types';
import { RandomUtils } from '@utils/randomize';

test.describe('Login feature @auth', async () => {
	test(
		'Login with invalid username and/or password',
		{
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-09',
			},
		},
		async ({ homePage, loginPage, navComponent }) => {
			await homePage.open();
			await homePage.expectNavigateToHomePage();
			await homePage.navComponent.clickSignInLink();
			await navComponent.expectNavigateToLoginPage();
			await loginPage.loginComponent.login('', '');
			await loginPage.loginComponent.expectRequiredEmailErrorMessage();
			await loginPage.loginComponent.expectRequiredPasswordErrorMessage();
			await loginPage.loginComponent.fillEmail(RandomUtils.randomString());
			await loginPage.loginComponent.expectEmailFormatErrorMessage();
			await loginPage.loginComponent.fillPassword('123456');
			// await loginPage.loginComponent.expectPasswordLengthErrorMessage();
			await loginPage.loginComponent.login(
				RandomUtils.randomEmail(),
				RandomUtils.randomPassword()
			);
			await loginPage.loginComponent.expectLoginErrorMessage();
		}
	);
});
