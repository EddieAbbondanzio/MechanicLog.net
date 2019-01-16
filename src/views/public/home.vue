<template>
  <master-page>
    <hero />
    <membership-plans />
    <input type="button" @click="fuckme" value="FUCK" />
  </master-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Hero from '@/components/public/home/hero.vue';
import MembershipPlans from '@/components/public/home/membership-plans.vue';
import MasterPage from '@/components/shared/master-page.vue';
import { Getter } from 'vuex-class';

@Component({
  components: {
    Hero,
    MembershipPlans,
    MasterPage,
  },
})
export default class Home extends Vue {
  /**
   * The backend URL to the API.
   */
  @Getter('apiUrl', { namespace: 'config'})
  public backendUrl!: string;

  public fuckme() {
    // alert(this.backendUrl);
  }
}
</script>
