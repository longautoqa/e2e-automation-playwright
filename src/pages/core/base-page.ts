import { Page, Locator, expect } from '@playwright/test';
import { step } from 'playwright-helpers';

export default abstract class BasePage {
	protected page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Common Assertions
	 */
	@step()
	async verifyElementText(locator: Locator, expectedText: string) {
		await expect(locator).toHaveText(expectedText);
	}

	@step()
	async verifyElementTextContains(locator: Locator, expectedText: string) {
		await expect(locator).toContainText(expectedText);
	}

	@step()
	async verifyElementTextNotContains(locator: Locator, expectedText: string) {
		await expect(locator).not.toContainText(expectedText);
	}

	@step()
	async verifyElementVisible(locator: Locator) {
		await expect(locator).toBeVisible();
	}

	@step()
	async verifyElementHidden(locator: Locator) {
		await expect(locator).toBeHidden();
	}

	@step()
	async verifyElementEnabled(locator: Locator) {
		await expect(locator).toBeEnabled();
	}

	@step()
	async verifyElementDisabled(locator: Locator) {
		await expect(locator).toBeDisabled();
	}

	@step()
	async verifyElementValue(locator: Locator, expectedValue: string) {
		await expect(locator).toHaveValue(expectedValue);
	}

	@step()
	async verifyElementChecked(locator: Locator) {
		await expect(locator).toBeChecked();
	}

	@step()
	async verifyElementNotChecked(locator: Locator) {
		await expect(locator).not.toBeChecked();
	}

	@step()
	async verifyElementCount(locator: Locator, expectedCount: number) {
		await expect(locator).toHaveCount(expectedCount);
	}

	@step()
	async verifyElementHasAttribute(
		locator: Locator,
		attribute: string,
		value: string
	) {
		await expect(locator).toHaveAttribute(attribute, value);
	}

	@step()
	async verifyElementHasClass(locator: Locator, className: string) {
		await expect(locator).toHaveClass(new RegExp(className));
	}

	@step()
	async verifyElementNotHaveClass(locator: Locator, className: string) {
		await expect(locator).not.toHaveClass(new RegExp(className));
	}

	@step()
	async verifyElementFocused(locator: Locator) {
		await expect(locator).toBeFocused();
	}

	@step()
	async verifyElementNotFocused(locator: Locator) {
		await expect(locator).not.toBeFocused();
	}

	@step()
	async verifyElementEmpty(locator: Locator) {
		await expect(locator).toBeEmpty();
	}

	@step()
	async verifyElementNotEmpty(locator: Locator) {
		await expect(locator).not.toBeEmpty();
	}

	/**
	 * Common Actions
	 */
	@step()
	async clickElement(locator: Locator) {
		await locator.click();
	}

	@step()
	async fillElement(locator: Locator, value: string) {
		await locator.fill(value);
	}

	@step()
	async typeElement(locator: Locator, value: string) {
		await locator.type(value);
	}

	@step()
	async clearElement(locator: Locator) {
		await locator.clear();
	}

	@step()
	async selectOption(locator: Locator, value: string) {
		await locator.selectOption(value);
	}

	@step()
	async checkElement(locator: Locator) {
		await locator.check();
	}

	@step()
	async uncheckElement(locator: Locator) {
		await locator.uncheck();
	}

	@step()
	async hoverElement(locator: Locator) {
		await locator.hover();
	}

	@step()
	async waitForElementVisible(locator: Locator, timeout?: number) {
		await locator.waitFor({ state: 'visible', timeout });
	}

	@step()
	async waitForElementHidden(locator: Locator, timeout?: number) {
		await locator.waitFor({ state: 'hidden', timeout });
	}
}
