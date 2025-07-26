import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
import Env from '@utils/env';

const environment = process.env.TEST_ENV || 'development';
const envFile = `.env.${environment}`;

const browser = Env.BROWSER || 'Desktop Chrome';

dotenv.config({
	path: path.resolve(__dirname, envFile),
	override: true,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	/* Run tests in files in parallel */
	fullyParallel: false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? Env.RETRY_ON_CI : 0,
	/* Opt out of parallel tests on CI. */
	// workers: process.env.CI ? 1 : undefined,
	workers: process.env.CI ? Env.WORKERS : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI
		? [
				['list'],
				['html', { outputFolder: 'playwright-report' }],
				['junit', { outputFile: 'test-results/junit-report.xml' }],
				[
					'playwright-ctrf-json-reporter',
					{
						outputDir: 'playwright-report',
						outputFile: `ctrf-test-report-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_NUMBER}.json`,
					},
				],
			]
		: [
				['html'],
				['list'],
				['junit', { outputFile: 'test-results/junit-report.xml' }],
			],
	expect: {
		timeout: Env.EXPECT_TIMEOUT || 30_000,
	},
	snapshotPathTemplate: 'test-data/snapshots/{testFileName}/{arg}{ext}',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		...devices[browser],
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',
		baseURL: 'https://practicesoftwaretesting.com/',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on',
		video: {
			mode: 'retain-on-failure',
		},
		actionTimeout: Env.ACTION_TIMEOUT || 20_000,
		navigationTimeout: Env.NAVIGATION_TIMEOUT || 60_000,
		testIdAttribute: 'data-test',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'setup',
			testMatch: '**/*.setup.ts',
			fullyParallel: true,
		},
		{
			name: 'api-test',
			dependencies: ['setup'],
			testDir: './tests/api',
		},
		{
			name: 'e2e-test',
			dependencies: ['setup'],
			testDir: './tests/e2e',
		},
		{
			name: 'visual-test',
			dependencies: ['setup'],
			testDir: './tests/visual',
			fullyParallel: true,
		},
	],
});
