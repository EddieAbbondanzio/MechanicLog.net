/**
 * Utility methods for strings.
 */
export class DateUtils {
    /**
     * Convert the date into a user friendly MM/dd/YYYY strng.
     * @param date The date to convert.
     */
    public static toFormattedDateString(date: Date) {
        const year = date.getFullYear();

        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }

    /**
     * Parse a date from it's raw string format.
     * @param dateStr The date string to parse.
     */
    public static parse(dateStr: string): Date {
        return new Date(dateStr.replace(/-/g, '/').replace(/T.+/, ''));
    }
}
