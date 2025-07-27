import { test, expect } from '@fixtures/ui-test-fixture';
import { TestType } from 'src/types';

test.describe('[Visual tests] User page', async () => {
	test(
		'Register page',
		{
			tag: '@visual',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-32',
			},
		},
		async ({ navComponent, registerPage }) => {
			await navComponent.openRegisterPageURL();
			await navComponent.expectNavigateToRegisterPage();
			await registerPage.expectRegisterPageOpened();

			await expect(registerPage.registerForm).toHaveScreenshot(
				'register-form.png'
			);
		}
	);

	test(
		'Login page',
		{
			tag: '@visual',
			annotation: {
				type: TestType.Test,
				description: 'https://demo.atlassian.net/browse/JIRA-33',
			},
		},
		async ({ navComponent, loginPage }) => {
			await navComponent.openLoginPageURL();
			await navComponent.expectNavigateToLoginPage();
			await loginPage.expectLoginPageOpened();

			await expect(loginPage.loginComponent.loginForm).toHaveScreenshot(
				'login-form.png'
			);
		}
	);
});
