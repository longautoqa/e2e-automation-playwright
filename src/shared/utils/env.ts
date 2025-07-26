export default class Env {
	// Urls
	static readonly BASE_URL = process.env.BASE_URL;
	static readonly API_URL = process.env.API_URL;
	// Account tests
	static readonly CUSTOMER_01_EMAIL = process.env.CUSTOMER_01_EMAIL;
	static readonly CUSTOMER_01_PASSWORD = process.env.CUSTOMER_01_PASSWORD;
	static readonly CUSTOMER_02_EMAIL = process.env.CUSTOMER_02_EMAIL;
	static readonly CUSTOMER_02_PASSWORD = process.env.CUSTOMER_02_PASSWORD;
	static readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL;
	static readonly ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
	// Playwright configs
	static readonly WORKERS = Number(process.env.WORKERS);
	static readonly BROWSER = process.env.BROWSER;
	static readonly ACTION_TIMEOUT = Number(process.env.ACTION_TIMEOUT);
	static readonly NAVIGATION_TIMEOUT = Number(process.env.NAVIGATION_TIMEOUT);
	static readonly EXPECT_TIMEOUT = Number(process.env.EXPECT_TIMEOUT);
	static readonly RETRY_ON_CI = Number(process.env.RETRY_ON_CI);
	static readonly RETRY = Number(process.env.RETRY);
	static readonly HEADLESS = process.env.HEADLESS;
	static readonly HTML_REPORT_DIR = process.env.HTML_REPORT_DIR;
	static readonly JUNIT_REPORT_DIR = process.env.JUNIT_REPORT_DIR;
}
