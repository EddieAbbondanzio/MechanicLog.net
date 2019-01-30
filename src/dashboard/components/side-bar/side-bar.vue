<style>
  .side-bar {
    height: calc(100vh - 128px - 80px);
  }
</style>
<template>
  <div class="side-bar">
    <div class="col-lg-2 bg-secondary h-100">hello world!</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

/**
 * Side bar used on the dashboard pages.
 */
@Component({
  name: 'side-bar',
})
export default class SideBar extends Vue {
}
</script>