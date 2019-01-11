<template>
  <master-page>
    <hero />
    <membership-plans />
  </master-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hero from '@/components/public/home/hero.vue';
import MembershipPlans from '@/components/public/home/membership-plans.vue';
import MasterPage from '@/components/shared/master-page.vue';

@Component({
  components: {
    Hero,
    MembershipPlans,
    MasterPage,
  },
})
export default class Home extends Vue {}
</script>
