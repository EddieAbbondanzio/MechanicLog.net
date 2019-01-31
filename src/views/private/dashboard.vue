<template>
    <side-bar/>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import SideBar from '@/dashboard/components/side-bar/side-bar.vue';

@Component({
  components: {
    SideBar,
  },
})
export default class Dashboard extends Vue { }
</script>