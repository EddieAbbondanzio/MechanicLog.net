/**
 * Utility methods for strings.
 */
export class StringUtils {
    /**
     * Convert the date into a user friendly MM/dd/YYYY strng.
     * @param date The date to convert.
     */
    public static toFormattedString(date: Date) {
        const year = date.getFullYear();

        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }
}
