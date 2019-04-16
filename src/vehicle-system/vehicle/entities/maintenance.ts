import { MaintenanceTag } from './maintenance-tag';
import { MaintenanceLine } from './maintenance-line';
import { MaintenanceCost } from './maintenance-cost';
import { MaintenanceLineType } from './maintenance-line-type';

export class Maintenance {
    /**
     * The unique ID of the maintenance event.
     */
    public id!: number;

    /**
     * The mechanic that performed the work.
     */
    // @foreignKeyColumn(Mechanic)
    // public mechanicId!: number;

    /**
     * The date the maintenace was performed.
     */
    public date!: Date;

    /**
     * The mileage on the vehicle when the service was performed.
     */
    public odometer!: number;

    /**
     * The description of what was performed.
     */
    public description!: string;

    /**
     * The tags of the maintenance record.
     */
    public tags!: MaintenanceTag[];

    /**
     * The lines (parts, or labor)
     */
    public lines!: MaintenanceLine[];

    /**
     * The cost details.
     */
    public cost!: MaintenanceCost;

    /**
     * Create a new instance.
     * @param opts The optional parameters.
     */
    constructor(opts: Partial<Maintenance> = {}) {
        // Hack for now
        if (typeof opts.date === 'string') {
            opts.date = new Date(opts.date);
        }

        Object.assign(this, opts);
    }

    public getParts(): MaintenanceLine[] {
        return this.lines.filter((l) => l.type === MaintenanceLineType.Part);
    }

    public getLabor(): MaintenanceLine[] {
        return this.lines.filter((l) => l.type === MaintenanceLineType.Labor);
    }

    public getOther(): MaintenanceLine[] {
        return this.lines.filter((l) => l.type === MaintenanceLineType.Other);
    }
}
