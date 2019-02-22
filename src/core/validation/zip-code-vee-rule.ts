/**
 * Add a zip code validator rule to VeeValidate.
 */
export const zipCodeVeeRule = {
    getMessage: (field: string) => `The ${field} is not a valid zip code in either ##### or #####-#### format.`,

    validate: (value: string) => {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);
    }
};
