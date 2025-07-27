export enum TestType {
	Test = 'test',
	Issue = 'issue',
}

// Re-export Playwright types for convenience
export type {
	Locator,
	Page,
	Expect,
	TestFixture,
	WorkerFixture,
	PlaywrightTestConfig,
	PlaywrightTestArgs,
	PlaywrightTestOptions,
	TestInfo,
} from '@playwright/test';

// Custom wrapper types for common actions with options
export interface ClickOptions {
	button?: 'left' | 'right' | 'middle';
	clickCount?: number;
	delay?: number;
	force?: boolean;
	modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
	noWaitAfter?: boolean;
	position?: { x: number; y: number };
	timeout?: number;
	trial?: boolean;
}

export interface FillOptions {
	force?: boolean;
	noWaitAfter?: boolean;
	timeout?: number;
}

export interface TypeOptions {
	delay?: number;
	noWaitAfter?: boolean;
	timeout?: number;
}

export interface SelectOptionOptions {
	force?: boolean;
	noWaitAfter?: boolean;
	timeout?: number;
}

export interface CheckOptions {
	force?: boolean;
	noWaitAfter?: boolean;
	position?: { x: number; y: number };
	timeout?: number;
	trial?: boolean;
}

export interface HoverOptions {
	force?: boolean;
	modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
	position?: { x: number; y: number };
	timeout?: number;
	trial?: boolean;
}

export interface WaitForOptions {
	state?: 'attached' | 'detached' | 'hidden' | 'visible';
	timeout?: number;
}

// Custom assertion types that mirror Playwright's expect options
export interface ToHaveTextOptions {
	useInnerText?: boolean;
	timeout?: number;
}

export interface ToContainTextOptions {
	useInnerText?: boolean;
	timeout?: number;
}

export interface ToHaveAttributeOptions {
	timeout?: number;
}

export interface ToHaveClassOptions {
	timeout?: number;
}

export interface ToHaveValueOptions {
	timeout?: number;
}

export interface ToBeVisibleOptions {
	timeout?: number;
}

export interface ToBeHiddenOptions {
	timeout?: number;
}

export interface ToHaveCountOptions {
	timeout?: number;
}

// Generic assertion options for methods that support timeout
export interface AssertionOptions {
	timeout?: number;
}
