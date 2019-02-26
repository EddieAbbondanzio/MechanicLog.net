<template>
    <div>
        <hero/>
        <membership-plans/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Hero from '@/public/components/hero.vue';
import MembershipPlans from '@/public/components/membership-plans.vue';
@Component({
    components: {
        Hero,
        MembershipPlans,
    },
})
export default class Home extends Vue {}
</script>
