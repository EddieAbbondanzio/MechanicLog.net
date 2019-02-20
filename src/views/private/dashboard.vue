<template>
    <div>
        Dashboard
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import PrivateMasterPage from '@/core/components/private/private-master-page.vue';

/**
 * Dashboard page of the app.
 */
@Component({
    components: {
        PrivateMasterPage,
    },
})
export default class Dashboard extends Vue { }
</script>