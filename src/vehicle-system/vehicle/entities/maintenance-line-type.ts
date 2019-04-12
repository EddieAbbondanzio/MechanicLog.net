/**
 * Indicator of what kind of line a maintenance line is.
 */
export enum MaintenanceLineType {
    /**
     * Line represents a part that was used.
     */
    Part = 1,
    /**
     * Line represents a job that was performed.
     */
    Labor = 2,
    /**
     * Line represents a fee, or something else.
     */
    Other = 3,
}
