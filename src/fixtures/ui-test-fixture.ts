import { test as base } from '@playwright/test';

import AccountPage from '@pages/account/account-page';
import NavigationComponent from '@pages/components/navigation-bar';
import SideBarComponent from '@pages/components/sidebar-component';
import CheckoutPage from '@pages/checkout/checkout-page';
import LoginPage from '@pages/login/login-page';
import SearchProduct from '@pages/product/search-product-page';
import HomePage from '@pages/home/home-page';
import RegisterPage from '@pages/register/register-page';
import ProductPage from '@pages/product/product-page';

export type BaseUIComponent = {
	navComponent: NavigationComponent;
	sideBarComponent: SideBarComponent;
};

export type BaseUI = {
	homePage: HomePage;
	loginPage: LoginPage;
	registerPage: RegisterPage;
	searchPage: SearchProduct;
	productPage: ProductPage;
	accountPage: AccountPage;
	checkoutPage: CheckoutPage;
};

export const test = base.extend<
	BaseUI & BaseUIComponent & { loggedInPage: any }
>({
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	registerPage: async ({ page }, use) => {
		await use(new RegisterPage(page));
	},
	productPage: async ({ page }, use) => {
		await use(new ProductPage(page));
	},
	searchPage: async ({ page }, use) => {
		await use(new SearchProduct(page));
	},
	accountPage: async ({ page }, use) => {
		await use(new AccountPage(page));
	},
	checkoutPage: async ({ page }, use) => {
		await use(new CheckoutPage(page));
	},

	navComponent: async ({ page }, use) => {
		await use(new NavigationComponent(page));
	},
});

export { expect } from '@playwright/test';
