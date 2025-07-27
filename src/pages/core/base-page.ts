import { Page, Locator, expect } from '@playwright/test';
import { step } from 'playwright-helpers';
import {
	ClickOptions,
	FillOptions,
	TypeOptions,
	SelectOptionOptions,
	CheckOptions,
	HoverOptions,
	WaitForOptions,
	ToHaveTextOptions,
	ToContainTextOptions,
	ToHaveAttributeOptions,
	ToHaveClassOptions,
	ToHaveValueOptions,
	ToBeVisibleOptions,
	ToBeHiddenOptions,
	ToHaveCountOptions,
	AssertionOptions,
} from '../../types';

export default abstract class BasePage {
	protected page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Common Actions
	 */
	@step()
	async clickElement(locator: Locator, options?: ClickOptions) {
		await locator.click(options);
	}

	@step()
	async fillElement(locator: Locator, value: string, options?: FillOptions) {
		await locator.fill(value, options);
	}

	@step()
	async typeElement(locator: Locator, value: string, options?: TypeOptions) {
		await locator.pressSequentially(value, options);
	}

	@step()
	async clearElement(locator: Locator) {
		await locator.clear();
	}

	@step()
	async selectOption(locator: Locator, value: string, options?: SelectOptionOptions) {
		await locator.selectOption(value, options);
	}

	@step()
	async checkElement(locator: Locator, options?: CheckOptions) {
		await locator.check(options);
	}

	@step()
	async uncheckElement(locator: Locator, options?: CheckOptions) {
		await locator.uncheck(options);
	}

	@step()
	async hoverElement(locator: Locator, options?: HoverOptions) {
		await locator.hover(options);
	}

	@step()
	async waitForElement(locator: Locator, options?: WaitForOptions) {
		await locator.waitFor(options);
	}

	@step()
	async waitForElementVisible(locator: Locator, timeout?: number) {
		await locator.waitFor({ state: 'visible', timeout });
	}

	@step()
	async waitForElementHidden(locator: Locator, timeout?: number) {
		await locator.waitFor({ state: 'hidden', timeout });
	}

	/**
	 * Common Assertions
	 */
	@step()
	async verifyElementText(locator: Locator, expectedText: string, options?: ToHaveTextOptions) {
		await expect(locator).toHaveText(expectedText, options);
	}

	@step()
	async verifyElementTextContains(locator: Locator, expectedText: string, options?: ToContainTextOptions) {
		await expect(locator).toContainText(expectedText, options);
	}

	@step()
	async verifyElementTextNotContains(locator: Locator, expectedText: string, options?: ToContainTextOptions) {
		await expect(locator).not.toContainText(expectedText, options);
	}

	@step()
	async verifyElementVisible(locator: Locator, options?: ToBeVisibleOptions) {
		await expect(locator).toBeVisible(options);
	}

	@step()
	async verifyElementHidden(locator: Locator, options?: ToBeHiddenOptions) {
		await expect(locator).toBeHidden(options);
	}

	@step()
	async verifyElementEnabled(locator: Locator, options?: AssertionOptions) {
		await expect(locator).toBeEnabled(options);
	}

	@step()
	async verifyElementDisabled(locator: Locator, options?: AssertionOptions) {
		await expect(locator).toBeDisabled(options);
	}

	@step()
	async verifyElementValue(locator: Locator, expectedValue: string, options?: ToHaveValueOptions) {
		await expect(locator).toHaveValue(expectedValue, options);
	}

	@step()
	async verifyElementChecked(locator: Locator, options?: AssertionOptions) {
		await expect(locator).toBeChecked(options);
	}

	@step()
	async verifyElementNotChecked(locator: Locator, options?: AssertionOptions) {
		await expect(locator).not.toBeChecked(options);
	}

	@step()
	async verifyElementCount(locator: Locator, expectedCount: number, options?: ToHaveCountOptions) {
		await expect(locator).toHaveCount(expectedCount, options);
	}

	@step()
	async verifyElementHasAttribute(
		locator: Locator,
		attribute: string,
		value: string,
		options?: ToHaveAttributeOptions
	) {
		await expect(locator).toHaveAttribute(attribute, value, options);
	}

	@step()
	async verifyElementHasClass(locator: Locator, className: string, options?: ToHaveClassOptions) {
		await expect(locator).toHaveClass(new RegExp(className), options);
	}

	@step()
	async verifyElementNotHaveClass(locator: Locator, className: string, options?: ToHaveClassOptions) {
		await expect(locator).not.toHaveClass(new RegExp(className), options);
	}

	@step()
	async verifyElementFocused(locator: Locator, options?: AssertionOptions) {
		await expect(locator).toBeFocused(options);
	}

	@step()
	async verifyElementNotFocused(locator: Locator, options?: AssertionOptions) {
		await expect(locator).not.toBeFocused(options);
	}

	@step()
	async verifyElementEmpty(locator: Locator, options?: AssertionOptions) {
		await expect(locator).toBeEmpty(options);
	}

	@step()
	async verifyElementNotEmpty(locator: Locator, options?: AssertionOptions) {
		await expect(locator).not.toBeEmpty(options);
	}
}
