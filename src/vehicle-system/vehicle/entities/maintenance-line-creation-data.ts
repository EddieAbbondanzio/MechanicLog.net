import { Nullable } from '@/core/common/monads/nullable';
import { MaintenanceLineType } from './maintenance-line-type';

/**
 * Creation data for creating new maintenance lines.
 */
export class MaintenanceLineCreationData {
    /**
     * The type of maintenance line it is.
     */
    public type?: MaintenanceLineType;

    /**
     * The number of items used.
     */
    public quantity?: number;

    /**
     * The text description of the maintenance line.
     */
    public description?: string;

    /**
     * The cost of the maintenance line.
     */
    public cost?: number;
}
