import { addDays, formatDate, subDays, subYears } from 'date-fns';

export class DateUtils {
	private static readonly defaultFormat = 'yyyy-MM-dd';

	static currentDate(format = this.defaultFormat) {
		return formatDate(Date.now(), format);
	}

	static plusDays(days: number, format = this.defaultFormat) {
		return formatDate(addDays(Date.now(), days), format);
	}

	static minusDays(days: number, format = this.defaultFormat) {
		return formatDate(subDays(Date.now(), days), format);
	}

	static minusYears(years: number, format = this.defaultFormat) {
		return formatDate(subYears(Date.now(), years), format);
	}
}
