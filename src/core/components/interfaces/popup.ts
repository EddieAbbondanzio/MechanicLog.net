
/**
 * Interface for a popup to implement.
 */
export interface Popup {
    /**
     * Show the popup to the user.
     */
    show(): void;

    /**
     * Hide the popup from the user.
     */
    hide(): void;
}
