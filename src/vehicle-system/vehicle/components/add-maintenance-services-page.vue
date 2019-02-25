<style lang="scss" scoped>
.service-list {
    max-height: 480px;
    overflow-y: scroll;
}
</style>


<template>
    <div>
        <p>What services were performed? Select as many that apply.</p>

        <!-- Available List -->
        <div>
            <div class="d-inline-block w-50 h-100">
                <h5 class="pt-4">Available Services</h5>

                <div class="service-list h-100">
                    <div
                        class="border-bottom border-muted py-1 service-option"
                        v-for="service in serviceList"
                        v-bind:key="service"
                        @click="onAdd(service)"
                    >
                        <material-icon icon="add" color="muted" class="align-middle pr-1"/>
                        <span class="text-muted align-bottom">{{ service }}</span>
                    </div>
                </div>
            </div>

            <!-- Selected List -->
            <div class="d-inline-block w-50 h-100 float-right">
                <h5 class="pt-4">Selected Services</h5>

                <div class="service-list h-100">
                    <div
                        class="border-bottom border-muted py-1 service-option"
                        v-for="service in selectedServices"
                        v-bind:key="service"
                        @click="onSub(service)"
                    >
                        <material-icon icon="remove" color="muted" class="align-middle pr-1"/>
                        <span class="text-muted align-bottom">{{ service }}</span>
                    </div>
                </div>
            </div>
        </div>

        <span class="text-danger" v-if="error != null">{{ error }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MaterialIcon from '@/core/components/material-icon.vue';
import { Nullable } from '@/core/common/monads/nullable';

/**
 * Add services performed page for the AddMaintenancePopup.
 */
@Component({
    name: 'add-maintenance-services-page',
    components: {
        MaterialIcon,
    },
})
export default class AddMaintenanceServicesPage extends Vue {
    /**
     * All available services
     */
    public availableServices!: string[];

    /**
     * The passed in services.
     */
    @Prop()
    public value!: string[];

    /**
     * Services selected by the user
     */
    public selectedServices!: string[];

    /**
     * The error message.
     */
    public error!: Nullable<string>;

    public created(): void {
        this.availableServices = this.serviceList;
        this.selectedServices = this.value;
        this.error = null;

        for (const service of this.selectedServices) {
            const index: number = this.availableServices.findIndex((s) => s === service);

            if (index !== -1) {
                this.availableServices.splice(index, 1);
            }
        }
    }

    /**
     * User wants to add a service to their selected list.
     */
    public onAdd(service: string): void {
        const index: number = this.availableServices.findIndex((s) => s === service);

        if (index !== -1) {
            this.availableServices.splice(index, 1);
            this.selectedServices.push(service);

            this.availableServices = this.availableServices.sort();
            this.selectedServices = this.selectedServices.sort();
        }

        this.$emit('input', this.selectedServices);
    }

    /**
     * User wants to remove a service from their selected list.
     */
    public onSub(service: string): void {
        const index: number = this.selectedServices.findIndex((s) => s === service);

        if (index !== -1) {
            this.selectedServices.splice(index, 1);
            this.availableServices.push(service);

            this.availableServices = this.availableServices.sort();
            this.selectedServices = this.selectedServices.sort();
        }

        this.$emit('input', this.selectedServices);
    }

    /**
     * Validate the page.
     */
    public async validate(): Promise<boolean> {
        if (this.selectedServices.length > 0) {
            this.error = null;
            return true;
        } else {
            this.error = 'At least one service must be selected.';
            this.$forceUpdate();
            return false;
        }
    }

    /**
     * All of the services. Starting point
     */
    public serviceList: string[] = [
        'Adjust Valve Clearance',
        'Adjust Wheel Alignment',
        'Change Air Filter',
        'Change Engine Coolant',
        'Change Fuel Filter',
        'Change Oil & Filter',
        'Change Spark Plugs',
        'Clean Carbeurator',
        'Clean Throttle Body',
        'Clean Fuel Injectors',
        'Emissions Inspection',
        'Inspect Battery',
        'Inspect Brakes',
        'Inspect Cooling System',
        'Inspect Drive Shaft Boot',
        'Inspect Engine Belts',
        'Inspect Hoses',
        'Inspect Muffler',
        'Inspect PCV Valve',
        'Inspect Springs',
        'Inspect Starter',
        'Inspect Suspension',
        'Inspect Tire Pressure',
        'Inspect Tire Tread Wear',
        'Inspect Transaxle',
        'Inspect Windshield Wipers',
        'Lube Chassis',
        'Other',
        'Recall',
        'Recharge Air Conditioner',
        'Replace Air Conditioner Compressor',
        'Replace Alternator',
        'Replace Battery',
        'Replace Brake Drum Shoes',
        'Replace Brake Fluid',
        'Replace Cap, Rotor & Spark Plug Wires',
        'Replace Catalytic Converter',
        'Replace Clutch',
        'Replace Control Arm Lower Ball Joint',
        'Replace Disc Brake Calipers',
        'Replace Disc Brake Pads',
        'Replace Drum Brake Cylinders',
        'Replace Drum Brake Shoes',
        'Replace Engine Belts',
        'Replace Exhaust Pipes',
        'Replace Fuel Injectors',
        'Replace Fuel Pump',
        'Replace Heater Core',
        'Replace Key',
        'Replace Oil Pump',
        'Replace Oxygen Sensor',
        'Replace PCV Valve',
        'Replace Power Steering Pump',
        'Replace Radiator',
        'Replace Radiator Hoses',
        'Replace Key Remote',
        'Replace Shock Absorbers',
        'Replace Struts',
        'Replace Thermostat',
        'Replace Tie Rods',
        'Replace Timing Belt',
        'Replace Timing Chain',
        'Replace Tires',
        'Replace Transmission Filter',
        'Replace Transmission Fluid',
        'Replace Universal CV Joint',
        'Replace Valve Lifters',
        'Replace Water Pump',
        'Replace Windshield Wipers',
        'Rotate Tires',
        'State Inspection',
        'Top Off Anti-Freeze',
        'Top Off Brake Fluid',
        'Top Off Clutch Fluid',
        'Top Off Engine Coolant',
        'Top Off Engine Oil',
        'Top Off Power Steering Fluid',
        'Top Off Transmission Fluid',
        'Top Off Windshield Washer Fluid',
        'Tune Up Engine',
    ];
}
</script>