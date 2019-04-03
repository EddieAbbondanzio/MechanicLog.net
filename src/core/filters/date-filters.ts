import Vue from 'vue';
import { DateUtils } from '../common/utils/date-utils';

/**
 * Convert the date into a nice MM/DD/YYYY string.
 */
Vue.filter('date', function(val: Date) {
    if (val == null) {
        return '';
    }

    return DateUtils.toFormattedDateString(val);
});
