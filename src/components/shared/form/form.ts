import { Component, Vue } from 'vue-property-decorator';

/**
 * Form component for collecting user input.
 */
@Component({})
export class Form extends Vue {
    private static INVALID_CSS_CLASS: string = 'is-invalid';
    private static VALID_CSS_CLASS: string = 'is-valid';

    /**
     * Validate a control on the form. This will automatically add a
     * valid, or invalid CSS class.
     * @param control The input control to validate.
     * @param markValid If the control should be given a green checkmark if it's valid.
     */
    protected validateControl(control: HTMLInputElement, markValid: boolean = false): boolean {
        if (!control.checkValidity()) {
            control.classList.add(Form.INVALID_CSS_CLASS);
            control.classList.remove(Form.VALID_CSS_CLASS);
            return false;
        } else {
            control.classList.remove(Form.INVALID_CSS_CLASS);

            if (markValid) {
                control.classList.add(Form.VALID_CSS_CLASS);
            }
            return true;
        }
    }
}
