<style lang="scss" scoped>
.header-row {
    font-weight: bold;
}
</style>


<template>
    <!-- Header Bar -->
    <div class="row py-2 header-row">
        <div class="col-2">
            <span>Mileage</span>
        </div>
        <div class="col-1">
            <span>Date</span>
        </div>
        <div class="col-2">
            <span>Mechanic</span>
        </div>
        <div class="col-3">
            <span>Service(s)</span>
        </div>
        <div class="col-1">
            <span>Cost</span>
        </div>
        <div class="col-2">
            <span>Label</span>
        </div>
        <div class="col-1">
            <span>Options</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'maintenance-history',
})
export default class MaintenanceHistory extends Vue {
}
</script>