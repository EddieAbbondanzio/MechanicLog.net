<template>
  <div class="container-fluid">
    <nav-bar/>
    <hero/>

    <!-- Features -->
    <!-- 4 Of 'Em -->
    <!-- Pricing -->
    <membership-plans />

    <page-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/shared/nav-bar/nav-bar.vue';
import Hero from '@/components/public/home/hero.vue';
import PageFooter from '@/components/shared/page-footer.vue';
import MembershipPlans from '@/components/public/home/membership-plans.vue';

@Component({
  components: {
    NavBar,
    Hero,
    PageFooter,
    MembershipPlans,
  },
})
export default class Home extends Vue { }
</script>
