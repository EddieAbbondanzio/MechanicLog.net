<template>
  <public-master-page>
    <hero />
    <membership-plans />
  </public-master-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PublicMasterPage from '@/core/components/public/public-master-page.vue';
import Hero from '@/components/public/home/hero.vue';
import MembershipPlans from '@/components/public/home/membership-plans.vue';
import { Getter } from 'vuex-class';

@Component({
  components: {
    Hero,
    MembershipPlans,
    PublicMasterPage,
  },
})
export default class Home extends Vue {
}
</script>
