import { test as base } from '@playwright/test';

import AccountPage from '@pages/account/accountPage';
import NavigationComponent from '@pages/components/navigationBar';
import SideBarComponent from '@pages/components/sideBarComponent';
import CheckoutPage from '@pages/checkout/checkoutPage';
import LoginPage from '@pages/login/loginPage';
import SearchProduct from '@pages/product/searchProductPage';
import HomePage from '@pages/homePage';
import RegisterPage from '@pages/register/registerPage';
import ProductPage from '@pages/product/productPage';
import InvoicePage from '@pages/invoice/invoicePage';

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
	invoicePage: InvoicePage;
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
	invoicePage: async ({ page }, use) => {
		await use(new InvoicePage(page));
	},
	navComponent: async ({ page }, use) => {
		await use(new NavigationComponent(page));
	},
});

export { expect } from '@playwright/test';
