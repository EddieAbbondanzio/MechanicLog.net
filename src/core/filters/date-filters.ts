import Vue from 'vue';

/**
 * Convert the date into a nice MM/DD/YYYY string.
 */
Vue.filter('date', function(val: Date) {
    if (val == null) {
        return '';
    }

    return val.toLocaleDateString();
});
