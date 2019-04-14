<template>
    <page-content>
        <div
            slot="tool-bar"
            class="d-flex flex-row align-items-center justify-content-between w-100"
        >
            <div class="text-muted">
                <router-link :to="{ name: 'vehicle-maintenance'}" class="text-primary">
                    <material-icon icon="keyboard_backspace" color="primary" class="align-middle"/>Back to Maintenance History
                </router-link>
            </div>

            <div>
                <div class="d-inline-block pb2 pb-sm-0 pr-2">
                    <!-- Button on screen -->
                </div>
            </div>
        </div>
    </page-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PageContent from '@/private/components/layout/page-content.vue';
import MaterialIcon from '@/core/components/material-icon.vue';

@Component({
    name: 'maintenance',
    components: {
        PageContent,
        MaterialIcon,
    },
})
export default class Maintenance extends Vue {}
</script>