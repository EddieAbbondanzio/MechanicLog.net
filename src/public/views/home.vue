<template>
    <div>
        <hero/>

        <feature-showcase/>

        <membership-plans/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Hero from '@/public/components/hero.vue';
import FeatureShowcase from '@/public/components/feature-showcase.vue';
import MembershipPlans from '@/public/components/membership-plans.vue';
import NavBar from '@/public/components/nav-bar.vue';
import MaterialIcon from '@/core/components/material-icon.vue';
import { CookieStorage } from '../../core/cookie-storage';
import { UserMixin } from '../../user-system/user-mixin';

@Component({
    components: {
        Hero,
        MembershipPlans,
        NavBar,
        MaterialIcon,
        FeatureShowcase,
    },
})
export default class Home extends UserMixin {}
</script>
