<style lang="scss">

</style>

<template>
  <div class="container-fluid mx-0 px-0" style="position: relative; min-height: 100vh;">
    <nav-bar/>

    <!-- Content of the page -->
    <div class="row">
      <div class="col-12">
        <slot></slot>
      </div>
    </div>

    <!-- Egads thats gross. We need this to prevent overlap behind the footer -->
    <div style="height: 128px;">&nbsp;</div>
    <page-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/core/components/public/nav-bar/nav-bar.vue';
import PageFooter from '@/core/components/public/page-footer.vue';

@Component({
  components: {
    NavBar,
    PageFooter,
  },
})
export default class PublicMasterPage extends Vue { }
</script>