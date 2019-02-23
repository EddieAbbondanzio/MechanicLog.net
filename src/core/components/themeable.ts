import { ThemeColor } from './theme-color';

/*
* This is an interface as a mixin would not be able to provide support for
* most things due to the different css classes needed.
*/

/**
 * A component that can be themed to follow the classic
 * BootStrap colors.
 */
export interface Themeable {
    /**
     * The color of the component.
     */
    color: ThemeColor;
}
