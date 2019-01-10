<style scoped>
.row {
  background-color: #232323;
}
</style>

<template>
  <div class="row py-5">
    <div class="col-12 text-center">
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