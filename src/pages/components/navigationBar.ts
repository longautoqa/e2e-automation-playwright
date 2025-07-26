import { test } from '@fixtures/baseUIFixture';
import AccountPage from '@pages/account/accountPage';
import BasePage from '@pages/basePage';
import CheckoutPage from '@pages/checkout/checkoutPage';
import InvoicePage from '@pages/invoice/invoicePage';
import LoginPage from '@pages/login/loginPage';
import ProductPage from '@pages/product/productPage';
import RegisterPage from '@pages/register/registerPage';
import { expect, Page } from '@playwright/test';
import Env from '@api/lib/helpers/env';
import { step } from 'playwright-helpers';

export default class NavigationComponent extends BasePage {
	private static readonly BASE_URL = Env.BASE_URL;

	constructor(page: Page) {
		super(page);
	}

	/**
	 * Application contents
	 */

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
		await this.cartLink.click();
	}

	@step()
	async clickSignInLink() {
		await this.signinLink.click();
	}

	@step()
	async clickHome() {
		await this.homeLink.click();
	}

	@step()
	async clickAccountDropdown() {
		await this.accountDropdownMenu.click();
	}

	@step()
	async clickSignOutLink() {
		await this.signOutLink.click();
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
	async openInvoicesPageURL() {
		await this.openURL(InvoicePage.invoiceUri);
	}

	@step()
	async openInvoiceDetailsPageURL(id: string) {
		await this.openURL(`${InvoicePage.invoiceUri}/${id}`);
	}

	@step()
	async openProfilePageURL() {
		await this.openURL(AccountPage.profileUri);
	}

	/**
	 * Methods
	 */

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
		await expect(this.signinLink).toBeHidden();
		// TODO: verify to contains logged in user info
	}

	@step()
	async expectCartQuantity(total: number) {
		await expect(this.cartQty).toHaveText(total.toString());
	}

	@step()
	async expectShoppingCartHidden() {
		await expect(this.cartLink).toBeHidden();
	}

	@step()
	async expectAccountDropdownShown() {
		await expect(this.accountDropdownBox).toBeVisible();
	}
}
