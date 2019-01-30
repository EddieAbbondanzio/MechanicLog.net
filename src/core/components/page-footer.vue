<style scoped>
.row {
    background-color: #232323;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
</style>

<template>
  <div class="row" style="height: 128px;">
    <div class="col-12 text-center" style="line-height: 128px;">
      <span class="text-light">© {{ year }} Eddie Abbondanzio</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'page-foot',
})
export default class PageFooter extends Vue {
  public year: number = new Date().getFullYear();
}
</script>