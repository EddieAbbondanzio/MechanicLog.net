<template>
    <div class="row px-3">
        <div class="col-12 px-0 mx-0">
            <card-container>
                <h2 class="pb-3">Settings</h2>
            </card-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardContainer from '@/core/components/cards/card-container.vue';

@Component({
    name: 'vehicle-settings-tab',
    components: {
        CardContainer,
    },
})
export default class VehicleSettingsTab extends Vue {}
</script>