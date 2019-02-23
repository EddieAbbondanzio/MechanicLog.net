<template>
    <div class="px-2">
        <div class="pt-4 pb-2">
            <h4>Account Settings</h4>
            <hr class="my-0 py-0">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
    name: 'settings-page',
    components: {},
})
export default class Settings extends Vue {}
</script>