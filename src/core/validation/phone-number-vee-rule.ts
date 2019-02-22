/**
 * Add a phone number validator rule to VeeValidate.
 */
export const phoneNumberVeeRule = {
    getMessage: (field: string) => `The ${field} is not a phone number with format ###-###-####.`,

    validate: (value: string) => {
        return RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$').test(value);
    }
};
