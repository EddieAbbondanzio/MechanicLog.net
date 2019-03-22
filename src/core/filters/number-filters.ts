import { NumberUtils } from '../common/utils/number-utils';
import { CurrencyType } from '../common/currency-type';
import Vue from 'vue';
import { Nullable } from '../common/monads/nullable';

/**
 * Convert a number to a nicely formatted string with commas.
 * @param val The value to filter.
 * @param decimalPlaces The number of decimal places to show.
 */
Vue.filter('number', function(val: number, decimalPlaces?: number) {
    if (val == null) {
        return '';
    }

    if (decimalPlaces == null) {
        return val.toLocaleString();
    } else {
        return val.toFixed(decimalPlaces).toLocaleString();
    }
});

/**
 * Convert a number to look like currency.
 * @param val The value to filter.
 * @param currencyType The type of currency it is.
 */
Vue.filter('currency', function(val: number, currencyType: CurrencyType = CurrencyType.USD) {
    if (val == null) {
        return '';
    }

    return NumberUtils.toCurrencyString(val, currencyType);
});

/**
 * Convert a number to look like currency with no
 * decimal places.
 * @param val The value to convert
 * @param currencyType The type of currency it is.
 */
Vue.filter('currencyInteger', function(val: number, currencyType: CurrencyType = CurrencyType.USD) {
    if (val == null) {
        return '';
    }

    return NumberUtils.toCurrencyIntegerString(val, currencyType);
});
