import { test } from '@fixtures/ui-test-fixture';

import AccountPage from '@pages/account/account-page';
import CheckoutPage from '@pages/checkout/checkout-page';
import BasePage from '@pages/core/base-page';
import LoginPage from '@pages/login/login-page';
import ProductPage from '@pages/product/product-page';
import RegisterPage from '@pages/register/register-page';
import { Page } from '@playwright/test';
import Env from '@utils/env';
import { step } from 'playwright-helpers';

export default class NavigationComponent extends BasePage {
	private static readonly BASE_URL = Env.BASE_URL;

	constructor(page: Page) {
		super(page);
	}

	/**
	 * Locators
	 */
	readonly homeLink = this.page.getByTestId('nav-home');
	public readonly navigationMenu = this.page.locator('#navbarSupportedContent');
	public readonly signinLink = this.page.locator('a[href="/auth/login"]');
	public readonly cartLink = this.page.getByTestId('nav-cart');
	public readonly productLinks = this.page
		.locator('a[data-test*="product"]')
		.first();
	public readonly cartQty = this.page.getByTestId('cart-quantity');
	public readonly accountDropdownMenu = this.page.getByTestId('nav-menu');
	public readonly accountDropdownBox = this.page.locator('.dropdown-menu.show');
	public readonly signOutLink = this.page.getByTestId('nav-sign-out');

	/**
	 * Actions
	 */
	@step()
	private async openURL(uri: string) {
		await test.step(`Opening page ${NavigationComponent.BASE_URL + uri}...`, async () => {
			await this.page.goto(NavigationComponent.BASE_URL + uri);
		});
	}

	@step()
	async clickShoppingCart() {
		await this.clickElement(this.cartLink);
	}

	@step()
	async clickSignInLink() {
		await this.clickElement(this.signinLink);
	}

	@step()
	async clickHome() {
		await this.clickElement(this.homeLink);
	}

	@step()
	async clickAccountDropdown() {
		await this.clickElement(this.accountDropdownMenu);
	}

	@step()
	async clickSignOutLink() {
		await this.clickElement(this.signOutLink);
	}

	@step()
	async openLoginPageURL() {
		await this.openURL(LoginPage.loginUri);
	}

	@step()
	async openRegisterPageURL() {
		await this.openURL(RegisterPage.registerUri);
	}

	@step()
	async openProductPageURL(productId: string) {
		await this.openURL(`${ProductPage.productUri}/${productId}`);
	}

	@step()
	async openCheckoutPageURL() {
		await this.openURL(CheckoutPage.checkoutUri);
	}

	@step()
	async openProfilePageURL() {
		await this.openURL(AccountPage.profileUri);
	}

	/**
	 * Assertions
	 */
	@step()
	private async expectNavigateTo(uri: string) {
		await this.page.waitForURL(new RegExp(`${uri}`));
	}

	@step()
	async expectNavigateToLoginPage() {
		await this.expectNavigateTo(LoginPage.loginUri);
	}

	@step()
	async expectNavigateToRegisterPage() {
		await this.expectNavigateTo(RegisterPage.registerUri);
	}

	@step()
	async expectNavigateToProductPage() {
		await this.expectNavigateTo(ProductPage.productUri);
	}

	@step()
	async expectNavigateToCheckoutPage() {
		await this.expectNavigateTo(CheckoutPage.checkoutUri);
	}

	@step()
	async expectSignedInSuccess() {
		await this.verifyElementHidden(this.signinLink);
	}

	@step()
	async expectCartQuantity(total: number) {
		await this.verifyElementText(this.cartQty, total.toString());
	}

	@step()
	async expectShoppingCartHidden() {
		await this.verifyElementHidden(this.cartLink);
	}

	@step()
	async expectAccountDropdownShown() {
		await this.verifyElementVisible(this.accountDropdownBox);
	}
}
