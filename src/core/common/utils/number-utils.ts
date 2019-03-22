import { CurrencyType } from '../currency-type';

/**
 * Utility methods for working with numbers.
 */
export class NumberUtils {
    /**
     * Convert a number to a formatted currency string with cents.
     * @param number The number to format.
     * @param type The type of currency it is.
     */
    public static toCurrencyString(number: number, type: CurrencyType): string {
        switch (type) {
            case CurrencyType.USD:
                return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
            default:
                throw new Error(`CurrencyType: ${type} not supported.`);
        }
    }

    /**
     * Convert a number to a formatted currency string.
     * @param number The number to convert
     * @param type The type of currency it is.
     */
    public static toCurrencyIntegerString(number: number, type: CurrencyType): string {
        switch (type) {
            case CurrencyType.USD:
                return `$${number.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
            default:
                throw new Error(`CurrencyType: ${type} not supported.`);
        }
    }
}
