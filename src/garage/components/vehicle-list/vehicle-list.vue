<template>
    <vehicle-summary/>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CreateVehicleForm from '@/garage/components/vehicle-list/create-vehicle-form.vue';
import VehicleSummary from '@/garage/components/vehicle-list/vehicle-summary.vue';

/**
 * List of vehicles that the user owns.
 */
@Component({
    name: 'vehicle-list',
    components: {
        CreateVehicleForm,
        VehicleSummary,
    },
})
export default class VehicleList extends Vue {
}
</script>