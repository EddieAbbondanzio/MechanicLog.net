<template>
    <private-master-page title="Garage">
    </private-master-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';

/**
 * Garage page.
 */
@Component({
    name: 'garage',
    components: {
        PrivateMasterPage,
    },
})
export default class Garage extends Vue {
}
</script>