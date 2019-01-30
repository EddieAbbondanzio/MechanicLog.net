<template>
  <master-page>
    <side-bar/>
  </master-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MasterPage from '@/core/components/master-page.vue';
import { Getter } from 'vuex-class';
import SideBar from '@/dashboard/components/side-bar/side-bar.vue';

@Component({
  components: {
    MasterPage,
    SideBar,
  },
})
export default class Dashboard extends Vue { }
</script>