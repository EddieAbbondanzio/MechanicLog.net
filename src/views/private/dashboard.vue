<template>
  <master-page>
      Yo da real MVP
  </master-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
import { Getter } from 'vuex-class';

@Component({
  components: {
    MasterPage,
  },
})
export default class Dashboard extends Vue {}
</script>